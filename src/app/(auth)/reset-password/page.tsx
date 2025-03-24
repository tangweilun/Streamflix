"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { logout } from "@/lib/action";
import { AuthBarWithSignInButton } from "@/components/auth-navbar/auth-navbar-sign-in";

//  Define schema for password validation
const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

// Reset Password API Function
async function resetPassword(data: { token: string; password: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  logout();
  if (!response.ok) {
    const text = await response.text();
    try {
      const errorData = JSON.parse(text);
      throw new Error(errorData.message || "Reset password failed.");
    } catch {
      throw new Error(text || "Reset password failed.");
    }
  }

  return await response.json();
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  // Extract token from URL safely
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful! Please sign in.");
      router.push("/sign-in");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    },
  });

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }
    mutation.mutate({ token, password: values.password });
  }

  return (
    <Card className="w-full max-w-md relative z-10 bg-black border border-gray-800 rounded-lg shadow-md opacity-85">
      <CardHeader className="space-y-1 px-4 sm:px-6 pt-6 sm:pt-8">
        <h2 className="text-2xl font-bold text-center text-white">
          Reset Password
        </h2>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
        {token ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 text-sm sm:text-base">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                        className="bg-gray-100 border-gray-700 text-black placeholder:text-gray-400 h-10 sm:h-11"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base h-10 sm:h-11 mt-2"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Resetting Password..." : "Reset"}
              </Button>
            </form>
          </Form>
        ) : (
          <p className="text-center text-white">Invalid or expired token.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthBarWithSignInButton />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-[url('/images/netflix-background-home.jpg')] bg-cover bg-center bg-no-repeat brightness-200"
          style={{ willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75" />
        <ResetPasswordForm />
      </div>
    </Suspense>
  );
}
