"use client"

import * as React from "react"
import { useEffect, useState } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
export default function TaskDrawer({ header, type = "create", submitFunc, title, setTitle, description, setDescription, status, setStatus, openUpdateDrawer, setOpenUpdateDrawer }) {

	const [error, setError] = useState({})

	useEffect(() => {
		setError({})
	}, [])

	const submitForm = () => {
		if(!title || !(title && title.trim())) {
			setError({
				title: true
			})
			return
		}
		if(!description || !(description && description.trim())) {
			setError({
				description: true
			})
			return
		}
		submitFunc()
	}

	return (
		<div>
			<Drawer open={openUpdateDrawer} onOpenChange={setOpenUpdateDrawer}>
				<DrawerContent>
					<div className="mx-auto w-full max-w-sm">
						<DrawerHeader>
							<DrawerTitle className="text-brand-400">{header}</DrawerTitle>
						</DrawerHeader>
						<div className="p-4 pb-0">
							<div className="mt-3 h-[350px]">
								<Label>
									Title
								</Label>
								<Input value={title} onChange={(e) => setTitle(e.target.value)} disabled={type === "view"}/>
								{error.title && (<p className="text-red-500 text-[12px] mb-[0px]">* This is a required field</p>)}
								<br></br>
								<Label>
									Description
								</Label>
								<Textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={type === "view"} />
								{error.description && (<p className="text-red-500 text-[12px] mb-[0px]">* This is a required field</p>)}
								<br></br>
								{!(type === "create") && (
									<>
										<Label>
											Status
										</Label>
										<Select onValueChange={(value) => setStatus(value)} value={status} disabled={type === "view"}>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="select status" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="To Do">To Do</SelectItem>
													<SelectItem value="In Progress">In Progress</SelectItem>
													<SelectItem value="Done">Done</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{error.status && (<p className="text-red-500 text-[12px] mb-[0px]">* This is a required field</p>)}
									</>
								)}
							</div>
						</div>
						<DrawerFooter>
							{type === "view" ? (
								<div className="flex justify-center gap-4">
									<DrawerClose asChild>
										<Button className="w-full bg-brand-400 hover:bg-brand-500">Close</Button>
									</DrawerClose>
								</div>
							) : (
								<div className="flex justify-center gap-4">
									<Button className="w-full bg-brand-400 hover:bg-brand-500" onClick={submitForm}>Submit</Button>
									<DrawerClose asChild>
										<Button className="w-full border-brand-400 hover:border-brand-500 text-brand-400 hover:text-brand-500" variant="outline">Cancel</Button>
									</DrawerClose>
								</div>
							)}

						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	)
}
