"use client";

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
// import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { AuthNavBarWithRegisterButton } from "@/components/navbar/auth-navbar-register";
import { login } from "@/app/login/action";
import { loginSchema } from "@/lib/utils";

export default function SignInPage() {
  //const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading] = useState(false);
  const [state, loginAction] = useActionState(login, undefined);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   async function onSubmit(values: z.infer<typeof loginSchema>) {
  //     loginAction(values);
  //     setIsLoading(true);
  //     try {
  //       // AWS Cognito integration would go here
  //       router.push("/verify-email");
  //     } catch (error) {
  //       console.error("Registration error:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  return (
    <>
      <AuthNavBarWithRegisterButton />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        {/* Background image overlay with better mobile handling */}
        <div
          className="absolute inset-0 bg-[url('/images/netflix-background-home.jpg')] bg-cover bg-center bg-no-repeat brightness-200"
          style={{ willChange: "transform" }} // Performance optimization for mobile
        />

        {/* Gradient overlay with adjusted opacity for better readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75" />

        {/* Content */}
        <Card className="w-full max-w-md relative z-10 bg-black border border-gray-800 rounded-lg shadow-md opacity-85">
          <CardHeader className="space-y-1 px-4 sm:px-6 pt-6 sm:pt-8">
            <h2 className="text-2xl font-bold text-center text-white">
              Sign In
            </h2>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                action={loginAction}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 text-sm sm:text-base">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="bg-gray-100 border-gray-700 text-black placeholder:text-gray-400 h-10 sm:h-11"
                        />
                      </FormControl>
                      {state?.errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {state?.errors.email}
                        </p>
                      )}
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 text-sm sm:text-base">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="bg-gray-100 border-gray-700 text-black placeholder:text-gray-400 h-10 sm:h-11"
                        />
                      </FormControl>
                      {state?.errors.password && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {state?.errors.password}
                        </p>
                      )}
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base h-10 sm:h-11 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
