import type { Course } from "../types/course";

import albany from "../assets/courses/albany.jpg";
import hiddenCanyon from "../assets/courses/hidden-canyon.jpg";
import pebbleBeach from "../assets/courses/pebble-beach.jpg";
import unnamed from "../assets/courses/unnamed.jpg";
import stAndrews from "../assets/courses/st-andrews.jpg";

const now = Date.now();

export const seedCourses: Course[] = [
	{
		id: crypto.randomUUID(),
		name: "Pebble Beach Golf Links",
		country: "United States",
		par: 72,
		difficulty: 4,
		featured: true,
		featuredAt: now - 5000,
		createdAt: now - 5000,
		imageUrl: pebbleBeach,
	},
	{
		id: crypto.randomUUID(),
		name: "Albany",
		country: "United States",
		par: 72,
		difficulty: 4,
		featured: false,
		createdAt: now - 4000,
		imageUrl: albany,
	},
	{
		id: crypto.randomUUID(),
		name: "Hidden Canyon",
		country: "United States",
		par: 72,
		difficulty: 4,
		featured: false,
		createdAt: now - 3000,
		imageUrl: hiddenCanyon,
	},
	{
		id: crypto.randomUUID(),
		name: "St. Andrews",
		country: "United Kingdom",
		par: 72,
		difficulty: 2,
		featured: false,
		createdAt: now - 2000,
		imageUrl: stAndrews,
	},
	{
		id: crypto.randomUUID(),
		name: "Coastal Dunes",
		country: "United Kingdom",
		par: 71,
		difficulty: 3,
		featured: false,
		createdAt: now - 1000,
		imageUrl: unnamed,
	},
];
