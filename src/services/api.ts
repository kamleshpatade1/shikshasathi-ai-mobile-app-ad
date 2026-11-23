import { apiRequest, type ApiEnvelope } from "./api-client";

export type College = {
  _id: string;
  collegeName: string;
  location: string;
  description: string;
  courses: string[];
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  _id: string;
  courseName: string;
  courseLevel: string;
  duration: string;
  eligibility: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentProfile = {
  _id: string;
  name: string;
  email: string;
  preferredLanguage: "English" | "Hindi";
  createdAt: string;
  updatedAt: string;
};

export type StudentProfileInput = {
  name: string;
  email: string;
  preferredLanguage: StudentProfile["preferredLanguage"];
};

export type StudentProfilePatch = Partial<StudentProfileInput>;

export type ListQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export type CollegeQuery = ListQuery & {
  location?: string;
  courseId?: string;
};

export type CourseQuery = ListQuery & {
  courseLevel?: string;
};

function makeQueryString(query: Record<string, string | number | undefined>) {
  const entries = Object.entries(query).filter(
    ([, value]) => value !== undefined && value !== "",
  );
  if (entries.length === 0) {
    return "";
  }

  return `?${entries
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&")}`;
}

export function getColleges(
  query: CollegeQuery = {},
  signal?: AbortSignal,
): Promise<ApiEnvelope<College[]>> {
  return apiRequest<College[]>(`/colleges${makeQueryString(query)}`, { signal });
}

export async function getCollegeById(
  id: string,
  signal?: AbortSignal,
): Promise<College> {
  const response = await apiRequest<College>(
    `/colleges/${encodeURIComponent(id)}`,
    { signal },
  );
  return response.data;
}

export function getCourses(
  query: CourseQuery = {},
  signal?: AbortSignal,
): Promise<ApiEnvelope<Course[]>> {
  return apiRequest<Course[]>(`/courses${makeQueryString(query)}`, { signal });
}

export async function getCourseById(
  id: string,
  signal?: AbortSignal,
): Promise<Course> {
  const response = await apiRequest<Course>(
    `/courses/${encodeURIComponent(id)}`,
    { signal },
  );
  return response.data;
}

export async function createStudentProfile(
  profile: StudentProfileInput,
  signal?: AbortSignal,
): Promise<StudentProfile> {
  const response = await apiRequest<StudentProfile>("/students", {
    method: "POST",
    body: JSON.stringify(profile),
    signal,
  });
  return response.data;
}

export async function getStudentProfile(
  id: string,
  signal?: AbortSignal,
): Promise<StudentProfile> {
  const response = await apiRequest<StudentProfile>(
    `/students/${encodeURIComponent(id)}`,
    { signal },
  );
  return response.data;
}

export async function updateStudentProfile(
  id: string,
  profile: StudentProfilePatch,
  signal?: AbortSignal,
): Promise<StudentProfile> {
  const response = await apiRequest<StudentProfile>(
    `/students/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(profile),
      signal,
    },
  );
  return response.data;
}
