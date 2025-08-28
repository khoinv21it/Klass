import apiClient from "../../../libraries/api-client";
import type { QueryConfig } from "../../../libraries/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { IEmployee } from "../../employee/employee.type";

export const fetchEmployees = async (): Promise<IEmployee[]> => {
  const res = await apiClient.get("/employees");
  console.log("Employees data:", res);
  return res as unknown as IEmployee[];
};

export const getEmployeesQueryOptions = () => {
  return queryOptions({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });
};

type UseEmployeesOptions = {
  queryConfig?: QueryConfig<typeof getEmployeesQueryOptions>;
};

export const useGetEmployees = ({ queryConfig }: UseEmployeesOptions = {}) => {
  return useQuery({
    ...getEmployeesQueryOptions(),
    ...queryConfig,
  });
};
