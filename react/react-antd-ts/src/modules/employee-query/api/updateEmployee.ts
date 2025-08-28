import apiClient from "../../../libraries/api-client";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { IEmployee } from "../../employee/employee.type";

export const updateEmployee = async (
  id: number,
  data: Partial<IEmployee>
): Promise<IEmployee> => {
  const res = await apiClient.put(`/employees/${id}`, data);
  return res.data;
};

type UpdateVars = { id: number; data: Partial<IEmployee> };

export const useUpdateEmployee = ({
  mutationConfig,
}: {
  mutationConfig?: UseMutationOptions<IEmployee, unknown, UpdateVars, unknown>;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<IEmployee, unknown, UpdateVars>({
    mutationFn: ({ id, data }: UpdateVars) => updateEmployee(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["employee", data.id], data);
      queryClient.setQueryData(["employees"], (old: unknown) => {
        if (!old) return old;
        if (Array.isArray(old)) {
          return (old as IEmployee[]).map((x) => (x.id === data.id ? data : x));
        }
        const oldAny = old as { data?: IEmployee[] };
        if (oldAny.data && Array.isArray(oldAny.data)) {
          return {
            ...oldAny,
            data: oldAny.data.map((x) => (x.id === data.id ? data : x)),
          };
        }
        return old;
      });

      if (onSuccess) onSuccess(data, variables, context);
    },
    ...restConfig,
  });
};
