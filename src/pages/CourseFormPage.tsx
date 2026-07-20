import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil, X } from "lucide-react";
import {
	Controller,
	type DefaultValues,
	useForm,
	useWatch,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import CourseCard, { type CourseCardData } from "../components/CourseCard";
import SelectField from "../components/SelectField";
import uploadIcon from "../assets/upload.svg";
import { COUNTRIES } from "../data/countries";
import { useCourse } from "../hooks/useCourse";
import { useCreateCourse } from "../hooks/useCreateCourse";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
import {
	courseFormSchema,
	imageFileSchema,
	type CourseFormValues,
} from "../schemas/courseFormSchema";

const DEFAULT_VALUES: DefaultValues<CourseFormValues> = {
	name: "",
	description: "",
	city: "",
	country: "",
	featured: false,
	imageUrl: undefined,
	imageName: undefined,
};

export default function CourseFormPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditing = Boolean(id);
	const courseQuery = useCourse(id);
	const createCourse = useCreateCourse();
	const updateCourse = useUpdateCourse();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageError, setImageError] = useState<string>();

	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<CourseFormValues>({
		resolver: zodResolver(courseFormSchema),
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		if (!courseQuery.data) return;

		reset({
			name: courseQuery.data.name,
			description: courseQuery.data.description,
			city: courseQuery.data.city,
			country: courseQuery.data.country,
			par: courseQuery.data.par,
			difficulty: courseQuery.data.difficulty,
			featured: courseQuery.data.featured,
			imageUrl: courseQuery.data.imageUrl,
			imageName: courseQuery.data.imageName,
		});
	}, [courseQuery.data, reset]);

	const formValues = useWatch({ control });
	const isSaving = createCourse.isPending || updateCourse.isPending;
	const mutationError = createCourse.error ?? updateCourse.error;

	const previewCourse: CourseCardData = {
		id: courseQuery.data?.id ?? "preview",
		name: formValues.name?.trim() || "Course title",
		description: formValues.description ?? "",
		city: formValues.city ?? "",
		country: formValues.country ?? "",
		par:
			typeof formValues.par === "number" && Number.isFinite(formValues.par)
				? formValues.par
				: undefined,
		difficulty:
			typeof formValues.difficulty === "number" &&
			Number.isInteger(formValues.difficulty)
				? formValues.difficulty
				: undefined,
		featured: formValues.featured ?? false,
		featuredAt: formValues.featured
			? (courseQuery.data?.featuredAt ?? 0)
			: undefined,
		imageUrl: formValues.imageUrl,
		imageName: formValues.imageName,
		createdAt: courseQuery.data?.createdAt ?? 0,
	};

	function handleImage(file: File | undefined) {
		if (!file) return;

		const result = imageFileSchema.safeParse(file);

		if (!result.success) {
			setImageError(result.error.issues[0]?.message ?? "Invalid image file");
			return;
		}

		setImageError(undefined);
		setValue("imageUrl", URL.createObjectURL(result.data), {
			shouldDirty: true,
		});
		setValue("imageName", result.data.name, { shouldDirty: true });
	}

	function removeImage() {
		if (formValues.imageUrl?.startsWith("blob:")) {
			URL.revokeObjectURL(formValues.imageUrl);
		}

		setValue("imageUrl", undefined, { shouldDirty: true });
		setValue("imageName", undefined, { shouldDirty: true });
		setImageError(undefined);
	}

	function onSubmit(values: CourseFormValues) {
		const onSuccess = () =>
			navigate("/", {
				state: {
					successMessage: id
						? "Course updated successfully."
						: "Course created successfully.",
				},
			});

		if (id) {
			updateCourse.mutate({ id, input: values }, { onSuccess });
			return;
		}

		createCourse.mutate(values, { onSuccess });
	}

	if (isEditing && courseQuery.isPending) {
		return (
			<div className='min-h-screen bg-neutral-100'>
				<AppHeader />
				<p className='mx-auto max-w-7xl px-6 py-12'>Loading course…</p>
			</div>
		);
	}

	if (isEditing && courseQuery.isError) {
		return (
			<div className='min-h-screen bg-neutral-100'>
				<AppHeader />
				<p role='alert' className='mx-auto max-w-7xl px-6 py-12 text-red-700'>
					{courseQuery.error.message}
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-neutral-100'>
			<AppHeader />

			<section className='border-b border-neutral-200 bg-white px-6 py-7 sm:px-8 lg:px-12'>
				<div className='mx-auto max-w-7xl'>
					<h1 className='text-2xl font-semibold text-neutral-800'>Courses</h1>
					<p className='mt-1 text-sm text-neutral-600'>
						Browse and add golf courses
					</p>
				</div>
			</section>

			<div className='border-b border-neutral-200 bg-white px-6 py-3 sm:px-8 lg:px-12'>
				<div className='mx-auto flex max-w-7xl justify-end'>
					<button
						type='submit'
						form='course-form'
						disabled={isSaving}
						className='min-w-28 cursor-pointer rounded-md bg-trackman-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-trackman-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange disabled:cursor-not-allowed disabled:opacity-60'>
						<span className='flex items-center justify-center gap-2'>
							{isSaving && (
								<LoaderCircle
									aria-hidden='true'
									className='animate-spin'
									size={17}
								/>
							)}
							{isSaving ? "Saving…" : "Save"}
						</span>
					</button>
				</div>
			</div>

			<main className='px-6 py-10 sm:px-8 lg:px-12'>
				<div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]'>
					<form id='course-form' onSubmit={handleSubmit(onSubmit)} noValidate>
						<h2 className='text-lg font-semibold text-neutral-700'>
							Course details
						</h2>
						<p className='mt-1 text-sm text-neutral-500'>
							Review the information and make changes if necessary.
						</p>

						<div className='mt-7 grid gap-5 sm:grid-cols-2'>
							<div>
								<div className='relative'>
									<label
										htmlFor='course-title'
										className='pointer-events-none absolute top-2 left-4 text-xs text-neutral-400'>
										Title*
									</label>
									<input
										{...register("name")}
										id='course-title'
										className='w-full rounded-lg border border-neutral-300 bg-white px-4 pt-6 pb-2 outline-none focus:border-trackman-orange focus:ring-1 focus:ring-trackman-orange'
									/>
								</div>
								{errors.name && (
									<span className='mt-1 block text-sm text-red-700'>
										{errors.name.message}
									</span>
								)}
							</div>

							<div>
								<Controller
									name='difficulty'
									control={control}
									render={({ field }) => (
										<SelectField
											label='Difficulty*'
											placeholder='Choose an option'
											value={field.value?.toString()}
											onChange={(value) => field.onChange(Number(value))}
											options={[1, 2, 3, 4, 5].map((difficulty) => ({
												label: difficulty.toString(),
												value: difficulty.toString(),
											}))}
										/>
									)}
								/>
								{errors.difficulty && (
									<span className='mt-1 block text-sm text-red-700'>
										{errors.difficulty.message}
									</span>
								)}
							</div>

							<div className='sm:col-span-2'>
								<div className='relative'>
									<label
										htmlFor='course-description'
										className='pointer-events-none absolute top-2 left-4 text-xs text-neutral-400'>
										Course description*
									</label>
									<textarea
										{...register("description")}
										id='course-description'
										rows={5}
										className='w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 pt-7 pb-3 outline-none focus:border-trackman-orange focus:ring-1 focus:ring-trackman-orange'
									/>
								</div>
								{errors.description && (
									<span className='mt-1 block text-sm text-red-700'>
										{errors.description.message}
									</span>
								)}
							</div>

							<div>
								<div className='relative'>
									<label
										htmlFor='course-par'
										className='pointer-events-none absolute top-2 left-4 text-xs text-neutral-400'>
										Par*
									</label>
									<input
										type='number'
										min={68}
										max={74}
										{...register("par", { valueAsNumber: true })}
										id='course-par'
										className='w-full rounded-lg border border-neutral-300 bg-white px-4 pt-6 pb-2 outline-none focus:border-trackman-orange focus:ring-1 focus:ring-trackman-orange'
									/>
								</div>
								{errors.par && (
									<span className='mt-1 block text-sm text-red-700'>
										{errors.par.message}
									</span>
								)}
							</div>
						</div>

						<label className='mt-6 flex w-fit items-center gap-3 text-sm font-medium text-neutral-700'>
							<input
								type='checkbox'
								{...register("featured")}
								className='h-5 w-5 rounded border-neutral-300 accent-trackman-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange'
							/>
							Featured course
						</label>

						<h3 className='mt-10 text-base font-semibold text-neutral-700'>
							Location
						</h3>
						<div className='mt-4 grid gap-5 sm:grid-cols-2'>
							<div>
								<div className='relative'>
									<label
										htmlFor='course-city'
										className='pointer-events-none absolute top-2 left-4 text-xs text-neutral-400'>
										City/State*
									</label>
									<input
										{...register("city")}
										id='course-city'
										className='w-full rounded-lg border border-neutral-300 bg-white px-4 pt-6 pb-2 outline-none focus:border-trackman-orange focus:ring-1 focus:ring-trackman-orange'
									/>
								</div>
								{errors.city && (
									<span className='mt-1 block text-sm text-red-700'>
										{errors.city.message}
									</span>
								)}
							</div>

							<div>
								<Controller
									name='country'
									control={control}
									render={({ field }) => (
										<SelectField
											label='Country*'
											placeholder='Choose an option'
											value={field.value}
											onChange={field.onChange}
											options={COUNTRIES.map((country) => ({
												label: country,
												value: country,
											}))}
										/>
									)}
								/>
								{errors.country && (
									<span className='mt-1 block text-sm text-red-700'>
										{errors.country.message}
									</span>
								)}
							</div>
						</div>

						<h3 className='mt-10 text-base font-semibold text-neutral-700'>
							Image
						</h3>
						<input
							ref={fileInputRef}
							type='file'
							accept='.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp'
							className='sr-only'
							onChange={(event) => handleImage(event.target.files?.[0])}
						/>

						{formValues.imageUrl ? (
							<div className='mt-4 flex max-w-sm items-center gap-4 rounded-xl bg-white p-3 shadow-sm'>
								<div className='relative shrink-0'>
									<img
										src={formValues.imageUrl}
										alt='Course upload preview'
										className='h-14 w-14 rounded-md object-cover'
									/>
									<button
										type='button'
										onClick={removeImage}
										aria-label='Remove image'
										className='absolute -top-2 -right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-white shadow-sm hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange'>
										<X aria-hidden='true' size={15} strokeWidth={2.5} />
									</button>
								</div>
								<span className='min-w-0 flex-1 truncate text-sm font-medium'>
									{formValues.imageName ?? "Current image"}
								</span>
								<button
									type='button'
									onClick={() => fileInputRef.current?.click()}
									aria-label='Choose a different image'
									className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-100 hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange'>
									<Pencil aria-hidden='true' size={18} />
								</button>
							</div>
						) : (
							<button
								type='button'
								onClick={() => fileInputRef.current?.click()}
								onDragOver={(event) => event.preventDefault()}
								onDrop={(event) => {
									event.preventDefault();
									handleImage(event.dataTransfer.files[0]);
								}}
								className='mt-4 flex min-h-52 w-full max-w-3xl cursor-pointer flex-col items-center justify-center rounded-xl bg-neutral-200 px-6 text-center text-neutral-500 hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trackman-orange'>
								<img src={uploadIcon} alt='' className='h-8 w-8' />
								<span className='mt-3 font-semibold'>Drag &amp; Drop</span>
								<span className='mt-1 text-sm'>
									Drag and drop or click to browse JPG, PNG, or WebP images
								</span>
							</button>
						)}

						{imageError && (
							<p role='alert' className='mt-2 text-sm text-red-700'>
								{imageError}
							</p>
						)}

						{mutationError && (
							<p role='alert' className='mt-6 text-sm text-red-700'>
								{mutationError.message}
							</p>
						)}
					</form>

					<aside className='self-start lg:sticky lg:top-8'>
						<p className='mb-4 text-center text-xs font-semibold tracking-wide text-neutral-500 uppercase'>
							Card preview
						</p>
						<CourseCard course={previewCourse} />
					</aside>
				</div>
			</main>
		</div>
	);
}
