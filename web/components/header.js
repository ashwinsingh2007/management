'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link'
import Lottie from "lottie-react";
import { useUserSession } from '@/hooks/use-user-session';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';
import { getUserDataSliceStore, saveUserDataSliceStore } from '@/store/slices/applicationSlice';
import { Button } from "@/components/ui/button"
import groovyWalkAnimation from "@/assets/task";

export function Header({ session }) {
	const userSessionId = useUserSession(session);
	const dispatch = useDispatch();
	const { data: userData } = useSelector((state) => {
    return state.saveUserDataSliceReducer
  });

	useEffect(() => {
		dispatch(getUserDataSliceStore.actions.fetchDataRequest());
	}, [dispatch])

	const handleSignIn = async () => {
		const userInfo = await signInWithGoogle();
		if (userInfo.uid) {
			dispatch(saveUserDataSliceStore.actions.saveUserDataRequest({ userInfo }));
			await createSession(userInfo.uid);
		}
	};

	const handleSignOut = async () => {
		await signOutWithGoogle();
		await removeSession();
	};

	if (!userSessionId) {
		return (
			<div className="flex flex-col h-[100vh]">
				<div className="m-[auto] mb-[10px]">
					<h1 className="text-[24px] text-center font-bold text-brand-400">Task Management App V1.0.0</h1>
				</div>
				<div className='m-[auto] mb-[10px] mt-[10px]'>
					<Lottie className="w-[300px] h-[300px]" animationData={groovyWalkAnimation} loop={true} />
				</div>
				<div className="flex justify-center m-[auto] mt-[20px]">
					<div class="flex items-center justify-center">
						<button class="px-8 py-4 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={handleSignIn}>
							<img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
							<span>Login with Google</span>
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<header className="p-[20px] md:p-[30px] flex justify-between border-b-[1px] items-center">
			<Link href="/home">
				<h1 className="md:text-[24px] text-[18px] text-center font-bold text-brand-400">Task Management App V1.0.0</h1>
			</Link>
			<div className="flex items-center gap-4">
				{userData?.data?.user?.id && (
					<Link href="/profile">
						<img className="w-[40px] rounded-full" src={userData?.data?.user?.photoUrl} />
					</Link>
				)}
			</div>
			
		</header>
	);
}

export default Header;