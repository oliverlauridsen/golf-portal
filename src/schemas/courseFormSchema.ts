import { z } from "zod";

export const courseFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
	description: z.string().trim().min(1, "Course description is required"),
	city: z.string().trim().min(1, "City or state is required"),
	country: z.string().min(1, "Country is required"),
	par: z
		.number({ error: "Par is required" })
		.int("Par must be a whole number")
		.min(68, "Par must be at least 68")
		.max(74, "Par must be at most 74"),
	difficulty: z.union(
		[z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)],
		{ error: "Choose a difficulty" },
	),
	featured: z.boolean(),
	imageUrl: z.string().optional(),
	imageName: z.string().optional(),
});

export const imageFileSchema = z
	.instanceof(File)
	.refine(
		(file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
		"Choose a JPG, PNG, or WebP image",
	);

export type CourseFormValues = z.infer<typeof courseFormSchema>;
