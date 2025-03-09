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
import { useMutation } from "@tanstack/react-query";
import { AuthBarWithSignInButton } from "@/components/auth-navbar/auth-navbar-sign-in";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeToken } from "@/lib/action";
import { useRouter } from "next/navigation";
const formSchema = z
  .object({
    userName: z
      .string()
      .min(2, { message: "User name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .min(10)
      .max(15, { message: "Invalid phone number length." }),
    dateOfBirth: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Please enter a valid date.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

async function registerUser(
  data: Omit<z.infer<typeof formSchema>, "confirmPassword">
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    try {
      // Try parsing as JSON
      const errorData = JSON.parse(text);
      throw new Error(errorData.message || "Registration failed.");
    } catch {
      // If parsing fails, assume plain text error message
      throw new Error(text || "Registration failed.");
    }
  }

  return await response.json();
}

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      dateOfBirth: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      storeToken(data.token);
      toast.success("Registration successful!");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { ...filteredValues } = values;
    const formattedDate = new Date(values.dateOfBirth).toISOString();
    mutation.mutate({
      ...filteredValues,
      dateOfBirth: formattedDate,
    });
  }

  return (
    <>
      <AuthBarWithSignInButton />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/images/netflix-background-home.jpg')] bg-cover bg-center bg-no-repeat brightness-200" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75" />

        <Card className="w-full max-w-4xl relative z-10 bg-black border border-gray-800 rounded-lg shadow-md opacity-85">
          <CardHeader className="space-y-1 px-4 sm:px-6 pt-6 sm:pt-8">
            <h2 className="text-2xl font-bold text-center text-white">
              Create your account
            </h2>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  "userName",
                  "email",
                  "password",
                  "confirmPassword",
                  "phoneNumber",
                  "dateOfBirth",
                ].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 text-sm sm:text-base">
                          {fieldName.charAt(0).toUpperCase() +
                            fieldName.slice(1).replace(/([A-Z])/g, " $1")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={
                              fieldName.includes("password")
                                ? "password"
                                : fieldName === "dateOfBirth"
                                ? "date"
                                : "text"
                            }
                            placeholder={`Enter your ${fieldName
                              .replace(/([A-Z])/g, " $1")
                              .toLowerCase()}`}
                            {...field}
                            className="bg-gray-100 border-gray-700 text-black placeholder:text-gray-400 h-10 sm:h-11"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                ))}
                <div className="col-span-1 md:col-span-2 mt-4">
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base h-10 sm:h-11"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending
                      ? "Creating account..."
                      : "Create Account"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
