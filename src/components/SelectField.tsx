import { useEffect, useId, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

interface SelectOption {
	label: string;
	value: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: SelectOption[];
	value?: string;
	error?: string;
	onChange: (value: string) => void;
}

export default function SelectField({
	label,
	placeholder,
	options,
	value = "",
	error,
	onChange,
}: SelectFieldProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const labelId = useId();
	const listboxId = useId();
	const errorId = useId();
	const selectedOption = options.find((option) => option.value === value);

	function open() {
		const selectedIndex = options.findIndex((option) => option.value === value);
		setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
		setIsOpen(true);
	}

	function selectOption(option: SelectOption) {
		onChange(option.value);
		setIsOpen(false);
	}

	useEffect(() => {
		if (!isOpen) return;

		function handlePointerDown(event: PointerEvent) {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [isOpen]);

	return (
		<div ref={containerRef} className='relative'>
		<span id={labelId} className='pointer-events-none absolute top-2 left-4 z-20 text-xs text-neutral-400'>
			{label}
		</span>

		<button
			type='button'
			aria-labelledby={labelId}
			aria-haspopup='listbox'
			aria-expanded={isOpen}
			aria-controls={isOpen ? listboxId : undefined}
			aria-describedby={error ? errorId : undefined}
			className={`relative block w-full rounded-lg border bg-white pr-12 pl-4 pt-6 pb-2 text-left outline-none focus:ring-1 ${isOpen ? "border-trackman-orange ring-1 ring-trackman-orange" : "border-neutral-300 focus:border-trackman-orange focus:ring-trackman-orange"}`}
			onClick={() => (isOpen ? setIsOpen(false) : open())}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					setIsOpen(false);
					return;
				}

				if (event.key === "ArrowDown" || event.key === "ArrowUp") {
					event.preventDefault();
					if (!isOpen) {
						open();
						return;
					}

					const direction = event.key === "ArrowDown" ? 1 : -1;
					setHighlightedIndex((index) =>
						(index + direction + options.length) % options.length,
					);
					return;
				}

				if ((event.key === "Enter" || event.key === " ") && isOpen) {
					event.preventDefault();
					selectOption(options[highlightedIndex]);
				}
			}}>
			<span className={selectedOption ? "text-neutral-800" : "text-neutral-400"}>
				{selectedOption?.label ?? placeholder}
			</span>
			<ChevronDown
				aria-hidden='true'
				size={20}
				className={`absolute top-1/2 right-4 -translate-y-1/2 transition-transform ${isOpen ? "rotate-180" : ""}`}
			/>
		</button>

		{isOpen && (
			<ul
				id={listboxId}
				role='listbox'
				aria-labelledby={labelId}
				className='absolute top-full right-0 left-0 z-30 mt-1 overflow-hidden rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/5'>
				{options.map((option, index) => (
					<li
						key={option.value}
						role='option'
						aria-selected={option.value === value}
						className={`cursor-pointer px-4 py-3 text-neutral-700 ${index === highlightedIndex ? "bg-neutral-100" : ""}`}
						onMouseEnter={() => setHighlightedIndex(index)}
						onClick={() => selectOption(option)}>
						{option.label}
					</li>
				))}
			</ul>
		)}

		{error && (
			<span id={errorId} className='mt-1 block text-sm text-red-700'>
				{error}
			</span>
		)}
	</div>
	);
}
