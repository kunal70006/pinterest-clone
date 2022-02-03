import { auth } from './firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, provider);
  return res;
};
