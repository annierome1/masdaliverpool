import { Resend } from 'resend';

// --- Rate limiter (in-memory, best-effort on serverless) ---
// Allows max 3 submissions per IP per 15-minute window.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// --- HTML entity escaping to prevent injection into email body ---
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isSafeSubjectLine(str) {
  return typeof str === 'string' && !/[\r\n]/.test(str);
}

function normalizeRecipients(to) {
  if (Array.isArray(to)) {
    return to.map((a) => String(a).trim()).filter(Boolean);
  }
  return String(to)
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);
}

function formatResendError(error) {
  if (!error) return 'Unknown error';
  const { message } = error;
  if (typeof message === 'string') return message;
  if (Array.isArray(message)) {
    return message
      .map((m) => (typeof m === 'string' ? m : JSON.stringify(m)))
      .join('; ');
  }
  if (message != null && typeof message === 'object') {
    return JSON.stringify(message);
  }
  return String(error);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = (process.env.RESEND_FROM || process.env.SMTP_FROM || '').trim();
  const toRaw = process.env.RESEND_TO || process.env.SMTP_TO;
  const toList = normalizeRecipients(toRaw || '');

  if (!apiKey || !from || toList.length === 0) {
    return res.status(500).json({
      success: false,
      error: 'Email is not configured. Set RESEND_API_KEY, RESEND_FROM (or SMTP_FROM), and RESEND_TO (or SMTP_TO).',
    });
  }

  // Rate limit by IP (x-forwarded-for is set by Vercel/proxies)
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = req.body || {};
  const isBooking = body.type === 'booking';

  let subject;
  let html;
  let replyTo;

  if (isBooking) {
    const {
      name,
      email,
      coach,
      sessionType,
      preferredDate,
      preferredTime,
      message,
    } = body;

    if (!name || !email || !coach || !preferredDate) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    subject = `Training session booking: ${String(coach)}`;
    if (!isSafeSubjectLine(subject)) {
      return res.status(400).json({ error: 'Invalid request.' });
    }

    replyTo = email;
    html = `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Coach:</strong> ${escapeHtml(coach)}</p>
        ${sessionType ? `<p><strong>Session type:</strong> ${escapeHtml(sessionType)}</p>` : ''}
        <p><strong>Preferred date:</strong> ${escapeHtml(preferredDate)}</p>
        ${preferredTime ? `<p><strong>Preferred time:</strong> ${escapeHtml(preferredTime)}</p>` : ''}
        <p><strong>Additional details:</strong></p>
        <p>${message ? escapeHtml(message).replace(/\n/g, '<br>') : '<em>(none)</em>'}</p>
      `;
  } else {
    const { name, email, phone, subject: userSubject, referral, message } = body;

    if (!name || !email || !phone || !userSubject || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (!isSafeSubjectLine(userSubject)) {
      return res.status(400).json({ error: 'Invalid subject.' });
    }

    subject = `New contact form: ${userSubject}`;
    replyTo = email;
    html = `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(userSubject)}</p>
        ${referral ? `<p><strong>How did they find us:</strong> ${escapeHtml(referral)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `;
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: toList,
      replyTo,
      subject,
      html,
    });

    if (error) {
      const msg = formatResendError(error);
      if (process.env.NODE_ENV === 'development') {
        console.error('[api/email] Resend error:', error);
      }
      return res.status(500).json({ success: false, error: msg });
    }

    return res.status(200).json({ success: true, messageId: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (process.env.NODE_ENV === 'development') {
      console.error('[api/email]', err);
    }
    return res.status(500).json({ success: false, error: message });
  }
}
