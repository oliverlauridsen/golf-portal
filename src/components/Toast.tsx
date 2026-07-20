import { useEffect } from "react";

import { CircleCheck, X } from "lucide-react";

interface ToastProps {
	message: string;
	variant: "success" | "error";
	onDismiss: () => void;
	autoDismissMs?: number;
}

export default function Toast({
	message,
	variant,
	onDismiss,
	autoDismissMs,
}: ToastProps) {
	useEffect(() => {
		if (!autoDismissMs) return;

		const timeoutId = window.setTimeout(onDismiss, autoDismissMs);
		return () => window.clearTimeout(timeoutId);
	}, [autoDismissMs, onDismiss]);

	const isSuccess = variant === "success";

	return (
		<div
			role={isSuccess ? "status" : "alert"}
			className={`fixed right-4 bottom-4 z-40 flex max-w-sm items-start gap-3 rounded-lg px-5 py-4 text-sm text-white shadow-xl sm:right-6 sm:bottom-6 ${isSuccess ? "bg-green-700" : "bg-red-700"}`}>
			{isSuccess && (
				<CircleCheck aria-hidden='true' className='mt-0.5 shrink-0' size={19} />
			)}
			<p className='flex-1 leading-6'>{message}</p>
			<button
				type='button'
				onClick={onDismiss}
				aria-label={`Dismiss ${variant} message`}
				className='mt-0.5 flex shrink-0 cursor-pointer rounded-sm p-0.5 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
				<X aria-hidden='true' size={18} />
			</button>
		</div>
	);
}
