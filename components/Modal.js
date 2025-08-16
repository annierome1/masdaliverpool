// components/Modal.js

import { useEffect, useMemo, useState } from 'react';
import styles from '../styles/components/modal.module.css';
import { client as sanityClient } from '../lib/sanity';

const DETAILS_QUERY = `
*[_type=="fighter_card" && (id==$id || name==$name)][0]{
  _id, id, name, role, stance, style, age, weight, record, bio, accomplishments,
  // keep using raw asset URLs for your <img> usage
  "image": image.asset->url,
  "gallery": gallery[].asset->url
}
`;

export default function Modal({ member, onClose }) {
  const [full, setFull] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch full details once the modal has mounted (published only)
  useEffect(() => {
    let alive = true;
    setLoading(true);
    sanityClient
      .fetch(DETAILS_QUERY, { id: member.id, name: member.name }, { perspective: 'published' })
      .then(doc => {
        if (!alive) return;
        setFull(doc || null);
        setLoading(false);
      })
      .catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [member.id, member.name]);

  // Use preview values immediately; replace with full once loaded
  const merged = useMemo(() => ({ ...member, ...(full || {}) }), [member, full]);

  // Safely default arrays
  const gallery = Array.isArray(merged.gallery) ? merged.gallery : [];
  const accomplishments = Array.isArray(merged.accomplishments) ? merged.accomplishments : [];

  // Determine which fields are present
  const rawRecord = typeof merged.record === 'string' ? merged.record.trim() : '';
  const hasRecord = rawRecord.length > 0;
  const hasAccomplishments = accomplishments.length > 0;
  const hasBio = typeof merged.bio === 'string' && merged.bio.trim() !== '';

  // Parse "W-L[-D]" robustly
  const parts = hasRecord ? rawRecord.replace(/\s+/g, '').split('-') : [];
  const w = parts[0] ? parseInt(parts[0], 10) || 0 : 0;
  const l = parts[1] ? parseInt(parts[1], 10) || 0 : 0;
  const d = parts[2] ? parseInt(parts[2], 10) || 0 : 0;

  const recordStats = [
    { label: 'Wins', value: w, type: 'wins' },
    { label: 'Losses', value: l, type: 'losses' },
    { label: 'Draws', value: d, type: 'draws' },
  ];
  const totalFights = w + l + d;

  const galleryClass = hasRecord ? styles.gallery : `${styles.gallery} ${styles.noRecordGallery}`;

  // Lock background scroll while open (nice on mobile)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>

        {/* Name */}
        <div className={styles.name}>
          <h2>{merged.name}</h2>
        </div>

        {/* Role, Stance, Style (render what we have; fills in when full loads) */}
        <div className={styles.roleWrapper}>
          <div className={styles.topRow}>
            {merged.role && <p className={styles.role}>{merged.role}</p>}
            {merged.stance && <p className={styles.stance}>{merged.stance}</p>}
            {merged.style && <p className={styles.style}>{merged.style}</p>}
          </div>

          {/* Age & Weight */}
          <div className={styles.bottomRow}>
            {merged.age != null && <p className={styles.ageBox}>{merged.age} yrs</p>}
            {merged.weight && <p className={styles.weight}>{merged.weight}</p>}
          </div>
        </div>

        {/* Loading hint (optional) */}
        {loading && (
          <div className={styles.loading} aria-live="polite">
            Loading details…
          </div>
        )}

        {/* Gallery */}
        <div className={galleryClass}>
          {gallery.length > 0 ? (
            gallery.map((src, idx) => (
              // Keep your original <img> handling
              <img
                key={idx}
                src={src}
                alt={`${merged.name} gallery ${idx + 1}`}
                className={styles.galleryImage}
                loading="lazy"
              />
            ))
          ) : (
            <p className={styles.comingSoon}>Coming soon</p>
          )}
        </div>

        {/* Bio, Record & Accomplishments */}
        <div className={styles.bioAccomplishmentsContainer}>
          {hasBio && (
            <div className={styles.bioWrapper}>
              <h3 className={styles.bioTitle}>Bio</h3>
              <p
                className={styles.bioText}
                dangerouslySetInnerHTML={{ __html: merged.bio }}
              />
            </div>
          )}

          {hasRecord && (
            <div className={styles.recordWrapper}>
              <h3 className={styles.recordTitle}>
                Record <span className={styles.totalFightsInline}>({totalFights} fights)</span>
              </h3>
              <ul className={styles.record}>
                {recordStats.map(({ label, value, type }) => (
                  <li key={label} className={styles.stat} data-type={type}>
                    <span className={styles.value}>{value}</span>
                    <span className={styles.label}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasAccomplishments && (
            <div className={styles.accomplishmentsWrapper}>
              <h3 className={styles.accomplishmentsTitle}>Accomplishments</h3>
              <ul className={styles.accomplishments}>
                {accomplishments.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
