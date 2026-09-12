import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface WithdrawInput {
  amountMinor: number;
  payoutReference: string;
}

export function useWithdraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amountMinor, payoutReference }: WithdrawInput) => {
      const res = await api.post(
        "/me/withdrawals",
        { amountMinor, payoutReference },
        { headers: { "Idempotency-Key": payoutReference } },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["earnings"] });
    },
  });
}