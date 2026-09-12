"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format backend role string (e.g. "INSTRUCTOR" -> "Instructor Account")
  const roleLabel = user?.role
    ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1).toLowerCase()} Account`
    : null;

  const isInstructor = user?.role?.toUpperCase() === "INSTRUCTOR";

  return (
    <header className="relative z-50 border-b border-border bg-bg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-text-primary"
        >
          Bema Learn
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/courses"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Courses
          </Link>

          {isAuthenticated && user ? (
            <>
              {/* Only show Earnings link if backend says user is an instructor */}
              {isInstructor && (
                <Link
                  href="/earnings"
                  className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  Earnings
                </Link>
              )}

              {/* User Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-border p-1 pr-2.5 transition hover:border-border-strong hover:bg-surface"
                >
                  {/* Minimalist User Avatar */}
                  <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-accent">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>

                  <span className="text-sm font-medium text-text-primary">
                    {user.name}
                  </span>

                  {/* Dropdown Arrow */}
                  <svg
                    className={`h-4 w-4 text-text-secondary transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                    <div className="border-b border-border px-3 py-2">
                      <p className="text-xs font-semibold text-text-primary">{user.name}</p>
                      {roleLabel && (
                        <p className="text-[11px] text-text-secondary">{roleLabel}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-accent-soft"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12"
                        />
                      </svg>
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}