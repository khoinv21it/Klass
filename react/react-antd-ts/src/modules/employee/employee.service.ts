import axios from "axios";
import { BASE_URL } from "../../constants";
import type { IEmployee } from "./employee.type";

export const fetchEmployees = async (): Promise<IEmployee[]> => {
  const response = await axios.get(`${BASE_URL}/employees`);
  console.log("Fetched employees:", response.data);
  return response.data;
};

export const createEmployee = async (
  payload: Partial<IEmployee>
): Promise<IEmployee> => {
  const response = await axios.post(`${BASE_URL}/employees`, payload);
  return response.data;
};

export const updateEmployee = async (
  id: number,
  payload: Partial<IEmployee>
): Promise<IEmployee> => {
  const response = await axios.put(`${BASE_URL}/employees/${id}`, payload);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/employees/${id}`);
};

export const getEmployeeById = async (id: number): Promise<IEmployee> => {
  const response = await axios.get(`${BASE_URL}/employees/${id}`);
  return response.data;
};
