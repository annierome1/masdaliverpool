import styles from '../styles/components/modal.module.css';

export default function Modal({ member, onClose }) {
  // Safely default arrays
  const gallery = Array.isArray(member.gallery) ? member.gallery : [];
  const accomplishments = Array.isArray(member.accomplishments) ? member.accomplishments : [];

  // Determine which fields are present
  const rawRecord = typeof member.record === 'string' ? member.record.trim() : '';
  const hasRecord = rawRecord.length > 0;
  const hasAccomplishments = accomplishments.length > 0;
  const hasBio = typeof member.bio === 'string' && member.bio.trim() !== '';

  // Parse "W-L[-D]" robustly, tolerate spaces, missing draws
  const parts = hasRecord ? rawRecord.replace(/\s+/g, '').split('-') : [];
  const w = parts[0] ? parseInt(parts[0], 10) || 0 : 0;
  const l = parts[1] ? parseInt(parts[1], 10) || 0 : 0;
  const d = parts[2] ? parseInt(parts[2], 10) || 0 : 0;

  const recordStats = [
    { label: 'Wins', value: w, type: 'wins' },
    { label: 'Losses', value: l, type: 'losses' },
    { label: 'Draws', value: d, type: 'draws' },
  ];

  // Always compute from parsed values so we don't depend on a separate field
  const totalFights = w + l + d;

  const galleryClass = hasRecord ? styles.gallery : `${styles.gallery} ${styles.noRecordGallery}`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>

        {/* Name */}
        <div className={styles.name}>
          <h2>{member.name}</h2>
        </div>

        {/* Role, Stance, Style */}
        <div className={styles.roleWrapper}>
          <div className={styles.topRow}>
            {member.role && <p className={styles.role}>{member.role}</p>}
            {member.stance && <p className={styles.stance}>{member.stance}</p>}
            {member.style && <p className={styles.style}>{member.style}</p>}
          </div>

          {/* Age & Weight */}
          <div className={styles.bottomRow}>
            {member.age != null && <p className={styles.ageBox}>{member.age} yrs</p>}
            {member.weight && <p className={styles.weight}>{member.weight}</p>}
          </div>
        </div>

        {/* Gallery */}
        <div className={galleryClass}>
          {gallery.length > 0 ? (
            gallery.map((src, idx) => (
              <img key={idx} src={src} alt={`${member.name} gallery ${idx + 1}`} className={styles.galleryImage} />
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
              <p className={styles.bioText} dangerouslySetInnerHTML={{ __html: member.bio }} />
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
