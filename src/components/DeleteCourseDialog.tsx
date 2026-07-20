import { useEffect, useId, useRef } from "react";

import { X } from "lucide-react";

interface DeleteCourseDialogProps {
	courseName: string;
	isDeleting: boolean;
	errorMessage?: string;
	onCancel: () => void;
	onConfirm: () => void;
}

export default function DeleteCourseDialog({
	courseName,
	isDeleting,
	errorMessage,
	onCancel,
	onConfirm,
}: DeleteCourseDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const descriptionId = useId();

	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			className='m-auto w-[min(90vw,35rem)] overflow-hidden rounded-2xl bg-white p-0 text-neutral-700 shadow-2xl backdrop:bg-black/45'
			onCancel={(event) => {
				if (isDeleting) {
					event.preventDefault();
					return;
				}

				onCancel();
			}}
			onClick={(event) => {
				if (event.target === event.currentTarget && !isDeleting) {
					onCancel();
				}
			}}>
			<div className='flex items-center justify-between border-b border-neutral-200 px-7 py-4'>
				<h2 id={titleId} className='text-lg font-semibold text-neutral-700'>
					Delete course
				</h2>
				<button
					type='button'
					disabled={isDeleting}
					onClick={onCancel}
					aria-label='Close delete dialog'
					className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange disabled:cursor-not-allowed disabled:opacity-50'>
					<X aria-hidden='true' size={26} strokeWidth={2} />
				</button>
			</div>

			<div className='px-5 py-5'>
				<p id={descriptionId} className='text-base leading-7 text-neutral-600'>
					Are you sure you want to delete <strong>{courseName}</strong>? You
					will lose all data attached to it.
				</p>

				{errorMessage && (
					<p role='alert' className='mt-5 text-sm font-medium text-red-700'>
						{errorMessage}
					</p>
				)}
			</div>

			<div className='flex justify-end border-t border-neutral-200 px-7 py-4'>
				<div className='flex w-full gap-3 sm:w-auto'>
					<button
						type='button'
						autoFocus
						disabled={isDeleting}
						onClick={onCancel}
						className='min-h-10 flex-1 cursor-pointer rounded-md bg-neutral-100 px-7 py-2.5 text-sm font-semibold hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none'>
						Cancel
					</button>
					<button
						type='button'
						disabled={isDeleting}
						onClick={onConfirm}
						className='min-h-10 flex-1 cursor-pointer rounded-md bg-red-600 px-7 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none'>
						{isDeleting ? "Deleting…" : "Delete"}
					</button>
				</div>
			</div>
		</dialog>
	);
}
