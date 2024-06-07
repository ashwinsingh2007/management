import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { firebaseAuth } from './config';

export function onAuthStateChanged(callback) {
	return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(firebaseAuth, provider);
		console.log("result.user:::", result.user)
		if (!result || !result.user) {
			throw new Error('Google sign in failed');
		}
		return {
			uid: result.user.uid,
			accessToken: result.user.accessToken,
			email: result.user.email,
			name: result.user.displayName,
			photoUrl: result.user.photoURL
		};
	} catch (error) {
		console.error('Error signing in with Google', error);
	}
}

export async function signOutWithGoogle() {
	try {
		await firebaseAuth.signOut();
	} catch (error) {
		console.error('Error signing out with Google', error);
	}
}