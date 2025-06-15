import styles from '../styles/components/modal.module.css';

export default function Modal({ member, onClose }) {
  // Determine which fields are present
  const hasRecord = typeof member.record === 'string' && member.record.trim() !== '';
  const hasTotalFights = member.totalFights != null;
  const hasAccomplishments = Array.isArray(member.accomplishments) && member.accomplishments.length > 0;
  const hasBio = typeof member.bio === 'string' && member.bio.trim() !== '';

  // Parse wins, losses, draws only if record exists
  const [wins, losses, draws] = hasRecord
    ? member.record.split('-').map(n => parseInt(n, 10) || 0)
    : [0, 0, 0];

  const recordStats = [
    { label: 'Wins', value: wins, type: 'wins' },
    { label: 'Losses', value: losses, type: 'losses' },
    { label: 'Draws', value: draws, type: 'draws' },
  ];

  const galleryClass = hasRecord
  ? styles.gallery
  : `${styles.gallery} ${styles.noRecordGallery}`

  
  


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
            {member.age != null && (
              <p className={styles.ageBox}>{member.age} yrs</p>
            )}
            {member.weight && (
              <p className={styles.weight}>{member.weight}</p>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className={galleryClass}>
          {member.gallery?.length > 0 ? (
            member.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${member.name} gallery ${index + 1}`}
                className={styles.galleryImage}
              />
            ))
          ) : (
            <p className={styles.comingSoon}>{/*PLACEHOLDER*/}</p>
          )}
        </div>

        {/* Bio, Record & Accomplishments */}
        <div className={styles.bioAccomplishmentsContainer}>
          {/* Bio Section */}
          {hasBio && (
            <div className={styles.bioWrapper}>
              <h3 className={styles.bioTitle}>Bio</h3>
              <p
              className={styles.bioText}
              dangerouslySetInnerHTML={{
                __html: member.bio.replace(/\n/g, '<br/>')
              }}
            />
            </div>
          )}

          {/* Record Section */}
          {hasRecord && hasTotalFights && (
            <div className={styles.recordWrapper}>
              <h3 className={styles.recordTitle}>
                Record{' '}
                <span className={styles.totalFightsInline}>
                  ({member.totalFights} fights)
                </span>
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

          {/* Accomplishments Section */}
          {hasAccomplishments && (
            <div className={styles.accomplishmentsWrapper}>
              <div className={styles.accomplishments}>
                <h3>Accomplishments</h3>
                <ul>
                  {member.accomplishments.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}