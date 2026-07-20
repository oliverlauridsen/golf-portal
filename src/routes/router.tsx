import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		lazy: async () => {
			const { default: CoursesPage } = await import("../pages/CoursesPage");
			return { Component: CoursesPage };
		},
	},
	{
		path: "/new",
		lazy: async () => {
			const { default: CourseFormPage } =
				await import("../pages/CourseFormPage");
			return { Component: CourseFormPage };
		},
	},
	{
		path: "/:id/edit",
		lazy: async () => {
			const { default: CourseFormPage } =
				await import("../pages/CourseFormPage");
			return { Component: CourseFormPage };
		},
	},
]);
