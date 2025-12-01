import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setAccessToken } from "../api/axios";

export function useLoginMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await api.post("/auth/login", { email, password });
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      qc.invalidateQueries(["admin"]);
    },
  });
}
