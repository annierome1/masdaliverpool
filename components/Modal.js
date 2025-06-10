import styles from '../styles/components/modal.module.css';

export default function Modal({ member, onClose }) {
    
   const [wins, losses, draws] = (() => {
    if (typeof member.record === 'string') {
      const parts = member.record.split('-').map(n => parseInt(n, 10) || 0);
      return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
    }
    return [0, 0, 0];     // fallback if field missing
  })();

  /* ---------- 2. Build a tiny array for mapping ---------- */
  const recordStats = [
    { label: 'Wins',   value: wins,   type: 'wins' },
    { label: 'Losses', value: losses, type: 'losses' },
    { label: 'Draws',  value: draws,  type: 'draws' },
  ];

  
    return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <div className={styles.name}><h2>{member.name}</h2></div>
        <div className={styles.roleWrapper}>
  <p className={styles.role}>{member.role}</p>
  <p className={styles.ageBox}>{member.age}</p>
  <p className={styles.weight}>{member.weight}</p>


        </div>

        <div className={styles.gallery}>
          {member.gallery?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${member.name} gallery ${index + 1}`}
              className={styles.galleryImage}
            />
          ))}
        </div>
            <div className={styles.bioAccomplishmentsContainer}>
            <div className={styles.recordWrapper}>
            {/* heading FIRST */}
            <h3 className={styles.recordTitle}>Record</h3>

            {/* cards row */}
            <ul className={styles.record}>
                {recordStats.map(({ label, value, type }) => (
                <li key={label} className={styles.stat} data-type={type}>
                    <span className={styles.value}>{value}</span>
                    <span className={styles.label}>{label}</span>
                </li>
                ))}
            </ul>
            </div>
        
            {member.accomplishments?.length > 0 && (
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
