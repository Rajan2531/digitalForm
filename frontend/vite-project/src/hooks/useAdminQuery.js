import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
const API_BASE = import.meta.env.VITE_API_BASE
export function useAdminQuery() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await api.get(`${API_BASE}/api/v1/admin/me`, {withCredentials:true, });
      console.log(res.data)
      return res.data;
    },
    retry: false,
    staleTime:5*1000
  });
}
