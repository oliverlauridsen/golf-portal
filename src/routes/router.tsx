import { createBrowserRouter } from "react-router-dom";

import CourseFormPage from "../pages/CourseFormPage";
import CoursesPage from "../pages/CoursesPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <CoursesPage />,
	},
	{
		path: "/new",
		element: <CourseFormPage />,
	},
	{
		path: "/:id/edit",
		element: <CourseFormPage />,
	},
]);
