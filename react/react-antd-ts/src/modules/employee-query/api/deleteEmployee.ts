import apiClient from "../../../libraries/api-client";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { IEmployee } from "../../employee/employee.type";

export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/employees/${id}`);
};

type DeleteVars = number;

export const useDeleteEmployee = ({
  mutationConfig,
}: {
  mutationConfig?: UseMutationOptions<void, unknown, DeleteVars, unknown>;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, unknown, DeleteVars>({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["employees"], (old: unknown) => {
        if (!old) return old;
        if (Array.isArray(old)) {
          return (old as IEmployee[]).filter((x) => x.id !== variables);
        }
        const oldAny = old as { data?: IEmployee[] };
        if (oldAny.data && Array.isArray(oldAny.data)) {
          return {
            ...oldAny,
            data: oldAny.data.filter((x) => x.id !== variables),
          };
        }
        return old;
      });

      queryClient.removeQueries({ queryKey: ["employee", variables] });

      if (onSuccess) onSuccess(data, variables, context);
    },
    ...restConfig,
  });
};
