"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useWithdraw } from "@/lib/hooks/useWithdraw";
import type { Earnings } from "@/lib/types/api";

function buildSchema(minimumMinor: number, availableMinor: number) {
  return z.object({
    amount: z
      .number({ invalid_type_error: "Enter a valid amount." })
      .int("Amount must be a whole number.")
      .min(minimumMinor / 100, `Minimum withdrawal is ${minimumMinor / 100}.`)
      .max(availableMinor / 100, "Amount exceeds your available balance."),
  });
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value / 100);
}

export function WithdrawForm({
  earnings,
  onClose,
}: {
  earnings: Earnings;
  onClose: () => void;
}) {
  const schema = buildSchema(earnings.minimumWithdrawalMinor, earnings.availableMinor);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const withdraw = useWithdraw();

  const [payoutReference] = useState(() => crypto.randomUUID());
  const [success, setSuccess] = useState(false);
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);

  async function onSubmit(data: FormData) {
    setSuccess(false);

    try {
      await withdraw.mutateAsync({
        amountMinor: Math.round(data.amount * 100),
        payoutReference,
      });

      setSuccess(true);
      setHasPendingWithdrawal(false);
      reset();

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const code = err.response.data?.code;

        if (code === "withdrawal_in_progress") {
          setHasPendingWithdrawal(true);
          setError("amount", {
            message: err.response.data?.message ?? "You already have a withdrawal in progress.",
          });
          return;
        }

        if (code === "below_minimum" || code === "insufficient_balance") {
          setError("amount", {
            message: err.response.data?.message ?? "Invalid amount.",
          });
          return;
        }
      }

      setError("amount", {
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdraw-title"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-surface shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 id="withdraw-title" className="text-lg font-semibold tracking-tight text-text-primary">
              Withdraw earnings
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Request a payout from your available balance.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close withdrawal form"
            className="text-xl leading-none text-text-secondary transition hover:text-text-primary disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
          {/* Pending withdrawal banner */}
          {hasPendingWithdrawal && (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm font-medium text-amber-800">
                You already have a withdrawal in progress. Please wait for it to complete before requesting another.
              </p>
            </div>
          )}

          {/* Available balance */}
          <div className="rounded-lg bg-bg px-4 py-3">
            <p className="text-xs font-medium text-text-secondary">Available balance</p>
            <p className="mt-1 text-lg font-semibold text-text-primary">
              {formatMoney(earnings.availableMinor, earnings.currency)}
            </p>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-text-primary">
              Withdrawal amount
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
                ₦
              </span>
              <input
                id="amount"
                type="number"
                step="1"
                min={earnings.minimumWithdrawalMinor / 100}
                max={earnings.availableMinor / 100}
                {...register("amount", { valueAsNumber: true })}
                placeholder="0"
                disabled={isSubmitting || hasPendingWithdrawal}
                className="w-full rounded-md border border-border bg-bg py-3 pl-9 pr-4 text-sm text-text-primary outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <p className="mt-2 text-xs text-text-secondary">
              Minimum withdrawal: {formatMoney(earnings.minimumWithdrawalMinor, earnings.currency)}
            </p>

            {errors.amount && (
              <p className="mt-2 text-sm text-error-text">{errors.amount.message}</p>
            )}
          </div>

          {/* Success */}
          {success && (
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-green-700">
                Withdrawal submitted successfully.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-md border border-border px-4 py-3 text-sm font-medium text-text-primary transition hover:bg-bg disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || hasPendingWithdrawal}
              className="flex-1 rounded-md bg-accent px-4 py-3 text-sm font-medium text-surface transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}