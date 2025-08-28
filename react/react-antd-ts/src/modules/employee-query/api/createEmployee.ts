/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../../../libraries/api-client";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { IEmployee } from "../../employee/employee.type";

export const createEmployee = async (
  data: Partial<IEmployee>
): Promise<IEmployee> => {
  const res = await apiClient.post("/employees", data);
  console.log("Create response:", res);
  return res as unknown as IEmployee;
};

type CreateVars = Partial<IEmployee>;

export const useCreateEmployee = ({
  mutationConfig,
}: {
  mutationConfig?: UseMutationOptions<IEmployee, unknown, CreateVars, unknown>;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<IEmployee, unknown, CreateVars>({
    mutationFn: (data) => createEmployee(data),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["employee", data.id], data);

      queryClient.setQueryData(["employees"], (old: any) => {
        if (!old) return [data];
        if (Array.isArray(old)) return [data, ...old];
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: [data, ...old.data],
          };
        }
        return old;
      });

      if (onSuccess) onSuccess(data, variables, context);
    },
    ...restConfig,
  });
};
