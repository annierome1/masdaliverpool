import styles from '../styles/components/modal.module.css';

export default function Modal({ member, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2>{member.name}</h2>
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
        <p className={styles.role}>{member.role}</p>
        <p className={styles.bio}>{member.bio}</p>
        
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
  );
}
