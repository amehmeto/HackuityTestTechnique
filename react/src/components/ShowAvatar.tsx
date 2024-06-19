import React, { useState } from 'react'
import styles from './ShowAvatar.module.css'

export function ShowAvatar(props: { resolveAvatar: (pseudo: string) => Promise<string> }) {
  const [pseudo, setPseudo] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPseudo = e.target.value;
    setPseudo(newPseudo);
    if (newPseudo) {
      try {
        const url = await props.resolveAvatar(newPseudo);
        setAvatarUrl(url);
        setError('');
      } catch (err) {
        console.log(err)
        setError('Invalid pseudo');
        setAvatarUrl('');
      }
    } else {
      setAvatarUrl('');
      setError('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <span>Pseudo:</span>
        <input
          type="text"
          value={pseudo}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <span>Avatar:</span>
        {avatarUrl ? <img src={avatarUrl} alt="avatar" className={styles.avatar} /> :
          <div className={styles.noAvatar}>No Avatar</div>
        }
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
