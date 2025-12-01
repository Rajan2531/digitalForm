import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setAccessToken } from "../api/axios";

export function useLogoutMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      setAccessToken(null);
      qc.removeQueries(["admin"]);
    },
  });
}
