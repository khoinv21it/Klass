import apiClient from "../../../libraries/api-client";
import { useQuery } from "@tanstack/react-query";
import type { IEmployee } from "../../employee/employee.type";

export const getEmployeeById = async (id: number): Promise<IEmployee> => {
  const res = await apiClient.get(`/employees/${id}`);
  return res.data;
};

export const useGetEmployee = (id?: number) => {
  return useQuery<IEmployee>({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id as number),
    enabled: typeof id === "number" && !isNaN(id),
  });
};
