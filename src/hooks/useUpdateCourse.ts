import { useMutation, useQueryClient } from "@tanstack/react-query";

import { courseService } from "../services/courseService";
import type { UpdateCourseInput } from "../types/course";
import { COURSES_QUERY_KEY, courseQueryKey } from "./courseKeys";

interface UpdateCourseVariables {
	id: string;
	input: UpdateCourseInput;
}

export function useUpdateCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, input }: UpdateCourseVariables) =>
			courseService.updateCourse(id, input),
		onSuccess: (updatedCourse) => {
			queryClient.setQueryData(courseQueryKey(updatedCourse.id), updatedCourse);
			return queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
		},
	});
}
