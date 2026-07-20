export const COURSES_QUERY_KEY = ["courses"] as const;

export function courseQueryKey(id: string) {
	return ["course", id] as const;
}
