import { useEffect, useId, useRef, useState } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseActionsMenuProps {
	courseId: string;
	courseName: string;
	onDelete: () => void;
}

export default function CourseActionsMenu({
	courseId,
	courseName,
	onDelete,
}: CourseActionsMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const menuId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		function handlePointerDown(event: PointerEvent) {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
				buttonRef.current?.focus();
			}
		}

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div ref={containerRef} className='relative shrink-0 '>
			<button
				ref={buttonRef}
				type='button'
				className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-neutral-100 text-neutral-600 opacity-100 transition hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-within:opacity-100'
				aria-label={`Actions for ${courseName}`}
				aria-haspopup='menu'
				aria-expanded={isOpen}
				aria-controls={isOpen ? menuId : undefined}
				onClick={() => setIsOpen((open) => !open)}>
				<Ellipsis aria-hidden='true' size={20} />
			</button>

			{isOpen && (
				<div
					id={menuId}
					role='menu'
					className='absolute top-11 right-0 z-20 w-40 overflow-hidden rounded-md bg-white py-1 shadow-xl ring-1 ring-black/5'>
					<Link
						to={`/${courseId}/edit`}
						role='menuitem'
						className='flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-trackman-orange focus-visible:outline-none'
						onClick={() => setIsOpen(false)}>
						<Pencil aria-hidden='true' size={17} />
						Edit
					</Link>
					<button
						type='button'
						role='menuitem'
						className='flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-trackman-orange focus-visible:outline-none'
						onClick={() => {
							setIsOpen(false);
							onDelete();
						}}>
						<Trash2 aria-hidden='true' size={17} />
						Delete
					</button>
				</div>
			)}
		</div>
	);
}
