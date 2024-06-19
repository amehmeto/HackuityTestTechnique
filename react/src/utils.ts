import SHA256 from 'crypto-js/md5';

/**
 *
 * You are NOT allowed to modify this function.
 *
 * However you do not need to understand its code.
 *
 */
export function pseudo2avatarURL(pseudo: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (pseudo.match(/[^a-z0-9]/)) {
        reject(new Error("Invalid pseudo"));
      } else {
        const hex = "06C28E4A";
        let x = 0;
        for (let i = 0; i < pseudo.length; i++) {
          x = (pseudo.charCodeAt(i) + (x << 6) + (x << 16) - x) & 0xffff;
        }
        const c = `${hex[x & 7]}${hex[(x >> 4) & 7]}${hex[(x >> 8) & 7]}`;
        resolve(`https://placehold.co/150/${c}/${c}`);
      }
    }, 500);
  });
}

export async function fetchRealWorldAvatar(pseudo: string): Promise<string> {
  const response = await fetch(`https://api.realworld.io/api/profiles/${pseudo}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.profile.image;
}


export async function fetchGravatarAvatar(pseudo: string): Promise<string> {
  const email = `${pseudo}@wootap.me`;
  const hash = SHA256(email).toString();
  return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
}
