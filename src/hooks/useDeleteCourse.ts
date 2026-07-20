import { useMutation, useQueryClient } from "@tanstack/react-query";

import { courseService } from "../services/courseService";
import type { Course } from "../types/course";
import { COURSES_QUERY_KEY, courseQueryKey } from "./courseKeys";

interface DeleteCourseContext {
	previousCourses: Course[] | undefined;
}

export function useDeleteCourse() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, string, DeleteCourseContext>({
		mutationFn: courseService.deleteCourse,
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: COURSES_QUERY_KEY });

			const previousCourses =
				queryClient.getQueryData<Course[]>(COURSES_QUERY_KEY);

			queryClient.setQueryData<Course[]>(COURSES_QUERY_KEY, (courses) =>
				courses?.filter((course) => course.id !== id),
			);

			return { previousCourses };
		},
		onError: (_error, _id, context) => {
			if (context?.previousCourses) {
				queryClient.setQueryData(COURSES_QUERY_KEY, context.previousCourses);
			}
		},
		onSuccess: (_data, id) => {
			queryClient.removeQueries({ queryKey: courseQueryKey(id) });
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY }),
	});
}
