"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/auth/authStore";

export function useAuth() {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const loginMutation = useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => login(email, password),

    onSuccess: (response) => {
      signIn(response.token, response.user);
      router.push("/");
    },
  });

  function logout() {
    signOut();
    router.push("/");
  }

  return {
    token,
    user,
    isAuthenticated: Boolean(token && user),

    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    signOut: logout,
  };
}