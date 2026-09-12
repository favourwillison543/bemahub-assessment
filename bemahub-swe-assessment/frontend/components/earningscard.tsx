"use client";

import axios from "axios";
import { useEarnings } from "@/lib/hooks/useEarnings";
import type { Earnings } from "@/lib/types/api";

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value / 100);
}

function getErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong while loading your earnings.";
  }

  if (!error.response) {
    return "We couldn't reach the earnings service. Please try again.";
  }

  if (error.response.status === 401) {
    return "You need to sign in to view your earnings.";
  }

  if (error.response.status === 403) {
    return "Your account is not permitted to view earnings.";
  }

  return "We couldn't load your earnings. Please try again.";
}

export function EarningsCard() {
  const { data, isLoading, isError, error } = useEarnings();

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <span>Loading your earnings overview...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm font-medium text-red-600">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm text-text-secondary">
          No earnings information is available at this time.
        </p>
      </div>
    );
  }

  return <EarningsContent earnings={data} />;
}

function EarningsContent({ earnings }: { earnings: Earnings }) {
  const canWithdraw = earnings.availableMinor >= earnings.minimumWithdrawalMinor;

  return (
    <div className="w-full space-y-4">
      {/* Primary Highlight Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:shadow-md sm:p-8">
        
        {/* Subtle Decorative Background Blob */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-soft opacity-50 blur-2xl" />

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Available Balance
              </span>
              <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                Ready to Withdraw
              </span>
            </div>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              {formatMoney(earnings.availableMinor, earnings.currency)}
            </h2>
          </div>

          {/* Action CTA Button */}
          <button
            type="button"
            disabled={!canWithdraw}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-surface transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>Withdraw Funds</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3-Grid Stat Cards Below */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        
        {/* Pending Card */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-border-strong">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-text-secondary">Pending Cleared</p>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-text-primary">
            {formatMoney(earnings.pendingMinor, earnings.currency)}
          </p>
        </div>

        {/* Minimum Withdrawal Card */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-border-strong">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-text-secondary">Min Threshold</p>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-text-primary">
            {formatMoney(earnings.minimumWithdrawalMinor, earnings.currency)}
          </p>
        </div>

        {/* Last Payout Card */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-border-strong">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-text-secondary">Last Withdrawal</p>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-text-primary">
            {earnings.lastWithdrawalAt
              ? new Date(earnings.lastWithdrawalAt).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "None yet"}
          </p>
        </div>

      </div>
    </div>
  );
}