import { useQuery } from "@tanstack/react-query";

import { courseService } from "../services/courseService";
import { COURSES_QUERY_KEY } from "./courseKeys";

export function useCourses() {
	return useQuery({
		queryKey: COURSES_QUERY_KEY,
		queryFn: courseService.getCourses,
	});
}
