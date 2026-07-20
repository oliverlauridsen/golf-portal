import type { Course } from "../types/course";

import albany from "../assets/courses/albany.jpg";
import hiddenCanyon from "../assets/courses/hidden_canyon.jpg";
import pebbleBeach from "../assets/courses/pebble_beach.jpg";
import unnamed from "../assets/courses/unnamed.jpg";
import stAndrews from "../assets/courses/st_andrews.jpg";

const now = Date.now();

export const seedCourses: Course[] = [
	{
		id: crypto.randomUUID(),
		name: "Pebble Beach Golf Links",
		description: "A renowned coastal golf course with dramatic ocean views.",
		city: "California",
		country: "United States",
		par: 72,
		difficulty: 4,
		featured: true,
		featuredAt: now - 5000,
		createdAt: now - 5000,
		imageUrl: pebbleBeach,
		imageName: "pebble_beach.jpg",
	},
	{
		id: crypto.randomUUID(),
		name: "Albany",
		description: "A championship course shaped by dunes and coastal winds.",
		city: "New Providence",
		country: "Bahamas",
		par: 72,
		difficulty: 4,
		featured: false,
		createdAt: now - 4000,
		imageUrl: albany,
		imageName: "albany.jpg",
	},
	{
		id: crypto.randomUUID(),
		name: "Hidden Canyon",
		description: "A desert course routed through striking canyon terrain.",
		city: "Arizona",
		country: "United States",
		par: 72,
		difficulty: 4,
		featured: false,
		createdAt: now - 3000,
		imageUrl: hiddenCanyon,
		imageName: "hidden_canyon.jpg",
	},
	{
		id: crypto.randomUUID(),
		name: "St. Andrews",
		description: "A historic links course shaped by centuries of play.",
		city: "Scotland",
		country: "United Kingdom",
		par: 72,
		difficulty: 2,
		featured: false,
		createdAt: now - 2000,
		imageUrl: stAndrews,
		imageName: "st_andrews.jpg",
	},
	{
		id: crypto.randomUUID(),
		name: "Coastal Dunes",
		description: "A windswept links course overlooking the coast.",
		city: "Cornwall",
		country: "United Kingdom",
		par: 71,
		difficulty: 3,
		featured: false,
		createdAt: now - 1000,
		imageUrl: unnamed,
		imageName: "unnamed.jpg",
	},
];
