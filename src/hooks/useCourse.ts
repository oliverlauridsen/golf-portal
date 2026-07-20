import { useQuery } from "@tanstack/react-query";

import { courseService } from "../services/courseService";
import { courseQueryKey } from "./courseKeys";

export function useCourse(id: string | undefined) {
	return useQuery({
		queryKey: courseQueryKey(id ?? ""),
		queryFn: () => {
			if (!id) {
				throw new Error("A course ID is required");
			}

			return courseService.getCourse(id);
		},
		enabled: Boolean(id),
	});
}
