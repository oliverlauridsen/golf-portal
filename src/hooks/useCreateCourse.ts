import { useMutation, useQueryClient } from "@tanstack/react-query";

import { courseService } from "../services/courseService";
import { COURSES_QUERY_KEY } from "./courseKeys";

export function useCreateCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: courseService.createCourse,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY }),
	});
}
