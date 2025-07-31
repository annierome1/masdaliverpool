
'use client';
import { useState } from 'react';
import styles from '../styles/components/FormSubmit.module.css';

export default function FormSubmit({
  to,
  subject,
  formType,             // 'inquiry' | 'eventInquiry' | 'careers'
  buttonText = 'Submit',
  children,
  className = '',
}) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log('📬 Sending payload:', { to, subject, formType, data });

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, formType, data }),
      });
      const text = await res.text();

      if (!res.ok) {
        console.error('❌ API error:', text);
        setStatus('error');
        return;            // **don't throw**—just bail out
      }

      console.log('✅ API success:', text);
      setStatus('success');
      e.target.reset();
    } catch (err) {
      console.error('🚨 Fetch failed:', err);
      setStatus('error');
    }
  };

  const formClass = [styles.form, styles[formType], className]
    .filter(Boolean)
    .join(' ');

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {children}

      <button type="submit" className={styles.primaryButton}>
        {status === 'sending'
          ? 'Sending…'
          : status === 'success'
          ? 'Sent!'
          : status === 'error'
          ? 'Try Again'
          : buttonText}
      </button>
    </form>
  );
}
