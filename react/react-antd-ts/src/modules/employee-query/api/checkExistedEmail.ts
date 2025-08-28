import apiClient from "../../../libraries/api-client";
import type { QueryConfig } from "../../../libraries/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const checkExistedEmail = async (email: string): Promise<boolean> => {
  const res = await apiClient.get("/check-email", { params: { email } });
  console.log("Check email exists:", res);
  return res as unknown as boolean;
};

export const checkExistedEmailQueryOptions = (email: string) => {
  return queryOptions({
    queryKey: ["check-email", email],
    queryFn: () => checkExistedEmail(email),
    enabled: !!email, // Chỉ chạy query nếu email không rỗng
  });
};

type UseCheckExistedEmailOptions = {
  email: string;
  queryConfig?: QueryConfig<typeof checkExistedEmailQueryOptions>;
};

export const useCheckExistedEmail = ({
  email,
  queryConfig,
}: UseCheckExistedEmailOptions) => {
  return useQuery({
    ...checkExistedEmailQueryOptions(email),
    ...queryConfig,
  });
};
