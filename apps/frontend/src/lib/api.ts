import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getStudios = async () => {
  try {
    const response = await api.get("/studios");
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getStudioClasses = async (studioId: string) => {
  try {
    const response = await api.get(`/classes/studios/${studioId}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getInstructors = async () => {
  try {
    const response = await api.get("/collaborators/roles/instructor");
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export async function getStudents() {
  const res = await api.get("/students");
  const data = await res.data;

  return data;
}

export async function getStudioSchedule(studioId: string) {
  const response = await api.get(`/schedule/studios/${studioId}`);
  const data = response.data;

  return data;
}
