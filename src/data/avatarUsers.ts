/**
 * Demo user photos, sourced from the "Avatar users" reference sheet in the
 * Nusantics Design System Figma file (node 2061:22852) — used throughout
 * Storybook wherever a story needs a real photo instead of a placeholder.
 * Photo credit is preserved per Figma's own attribution rows (Unsplash/Pexels).
 */
export interface AvatarUser {
  name: string;
  /** Served from public/avatars — square, 640x640 */
  src: string;
  photoCredit: string;
  photoCreditUrl: string;
}

export const AVATAR_USERS: AvatarUser[] = [
  { name: 'Olivia Rhye', src: '/avatars/olivia-rhye.jpg', photoCredit: 'Aiony Haust', photoCreditUrl: 'https://unsplash.com/photos/IXYxqP4zejo' },
  { name: 'Phoenix Baker', src: '/avatars/phoenix-baker.jpg', photoCredit: 'Diana Simumpan', photoCreditUrl: 'https://unsplash.com/photos/M7i6iMgzPwc' },
  { name: 'Lana Steiner', src: '/avatars/lana-steiner.jpg', photoCredit: 'Anna Nekrashevich', photoCreditUrl: 'https://www.pexels.com/photo/curly-haired-woman-holding-sheets-of-hard-papers-7552448/' },
  { name: 'Demi Wilkinson', src: '/avatars/demi-wilkinson.jpg', photoCredit: 'Jessica Felicio', photoCreditUrl: 'https://unsplash.com/photos/_cvwXhGqG-o' },
  { name: 'Candice Wu', src: '/avatars/candice-wu.jpg', photoCredit: 'Aiony Haust', photoCreditUrl: 'https://unsplash.com/photos/f2ar0ltTvaI' },
  { name: 'Natali Craig', src: '/avatars/natali-craig.jpg', photoCredit: 'Joe Gardner', photoCreditUrl: 'https://unsplash.com/photos/N5GCRjEMboQ' },
  { name: 'Drew Cano', src: '/avatars/drew-cano.jpg', photoCredit: 'Andrea Piacquadio', photoCreditUrl: 'https://www.pexels.com/photo/man-in-brown-button-up-shirt-3785079/' },
];
