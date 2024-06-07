"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useSelector } from 'react-redux';
import { signOutWithGoogle } from '@/libs/firebase/auth';
import { removeSession } from '@/actions/auth-actions';


export default function Profile() {

	const { data: userData } = useSelector((state) => {
		return state.saveUserDataSliceReducer
	});

	const handleSignOut = async () => {
		await signOutWithGoogle();
		await removeSession();
	};


	return (
		<div class="h-screen pt-12">
			<div class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
				<div class="border-b px-4 pb-6">
					<div class="text-center my-4">
						<img class="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
							src={userData?.data?.user?.photoUrl} alt="" />
						<div class="py-2">
							<h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">{userData?.data?.user?.name}</h3>
							<div class="inline-flex text-gray-700 gap-2 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
								</svg>
								{userData?.data?.user?.email}
							</div>
						</div>
						<div>
							<Button className="bg-white mt-[20px] text-brand-400 border border-brand-400" onClick={handleSignOut}>Sign Out</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
