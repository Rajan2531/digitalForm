import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export function useAdminQuery() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const { data } = await api.get("/api/admin/me");
      return data.admin;
    },
    retry: false,
  });
}
