import { z } from "zod";

export const courseSchema = z.object({
	id: z.string(),
	name: z.string(),
	country: z.string(),
	par: z.number().int(),
	difficulty: z.union([
		z.literal(1),
		z.literal(2),
		z.literal(3),
		z.literal(4),
		z.literal(5),
	]),
	featured: z.boolean(),
	featuredAt: z.number().optional(),
	imageUrl: z.string().optional(),
	createdAt: z.number(),
});

export const courseArraySchema = z.array(courseSchema);
