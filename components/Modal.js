import styles from '../styles/components/modal.module.css';

export default function Modal({ member, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <div className={styles.name}><h2>{member.name}</h2></div>
        <div className={styles.roleWrapper}> <p className={styles.role}>{member.role}</p></div>
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
        <div className={styles.bioWrapper}>
        <p className={styles.bio}>{member.bio}</p></div>
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
