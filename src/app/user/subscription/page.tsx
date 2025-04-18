"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Loader2, RefreshCw } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/skeleton";
import { getUserId } from "@/lib/action";
import { Badge } from "@/components/ui/badge";

interface Plan {
  id: string;
  planName: string;
  price: number;
  featuresJson: string;
  quality: string;
  maxStreams: number;
}

interface UserSubscription {
  userId: string;
  planId: string;
}

const fetchSubscriptionPlans = async (): Promise<Plan[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subscription/get-all-plans`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subscription plans.");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    throw error;
  }
};

const getSubscribedPlan = async (): Promise<UserSubscription | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subscription/get-subscribed-plan`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (response.status === 401) {
      throw new Error(
        "Unauthorized: Please log in to view your subscription plan."
      );
    }

    // Current user is not subscribing to any plan
    if (response.status === 404) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching subscribed plan:", error);
    throw error;
  }
};

export default function SubscriptionPage() {
  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchSubscriptionPlans,
  });

  const { data: subscribedPlan } = useQuery({
    queryKey: ["subscribedPlan"],
    queryFn: getSubscribedPlan,
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (planId: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscription/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: await getUserId(), planId: planId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process checkout session.");
      }

      return response.text();
    },

    onSuccess: (sessionUrl) => {
      window.location.href = sessionUrl;
    },
  });

  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);

  // Get the full plan object to pass to the body of api call
  const selectedPlanObj = plans?.find(
    (plan) => plan.planName === selectedPlanName
  );

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
            Choose Your Plan
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Select the perfect streaming plan for you
          </p>
        </div>

        {isError && (
          <div className="mt-8 p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
            <p className="text-red-300">
              There was an error loading subscription plans. Please try again
              later.
            </p>
            <p className="text-red-400 text-sm mt-1">
              {error instanceof Error
                ? error.message
                : "Unknown error occurred"}
            </p>
            <Button
              variant="outline"
              className="mt-2 border-red-700 text-white hover:bg-red-800"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        )}

        <div className="mt-8 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900 border-2 border-gray-700"
                  >
                    <CardHeader>
                      <Skeleton className="h-8 w-32 bg-gray-800" />
                      <Skeleton className="h-4 w-24 mt-2 bg-gray-800" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-40 bg-gray-800" />
                      <div className="mt-6 space-y-4">
                        {Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="flex items-start">
                              <Skeleton className="h-6 w-6 rounded-full bg-gray-800" />
                              <Skeleton className="ml-3 h-4 w-full bg-gray-800" />
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-full bg-gray-800" />
                    </CardFooter>
                  </Card>
                ))
            : plans?.map((plan) => {
                const features = JSON.parse(plan.featuresJson) as string[];
                const isCurrentPlan = plan.id === subscribedPlan?.planId;

                return (
                  <Card
                    key={plan.planName}
                    className={`flex flex-col justify-between bg-gray-900 border-2 ${
                      isCurrentPlan
                        ? "border-green-500"
                        : selectedPlanName === plan.planName
                        ? "border-orange-700"
                        : "border-gray-700"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl font-bold text-white">
                            {plan.planName}
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            {plan.quality}
                          </CardDescription>
                        </div>
                        {isCurrentPlan && (
                          <Badge className="bg-green-600">Current Plan</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-extrabold text-white">
                        RM{plan.price.toFixed(2)}
                        <span className="text-xl font-medium text-gray-400">
                          {" "}
                          /month
                        </span>
                      </div>
                      <ul className="mt-6 space-y-4">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check className="h-6 w-6 text-orange-500" />
                            </div>
                            <p className="ml-3 text-base text-gray-300">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    {isCurrentPlan ? (
                      <CardFooter className="flex flex-col gap-2">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 cursor-default"
                          disabled
                        >
                          Current Plan
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-red-700 text-red-500 hover:bg-red-950 hover:text-red-400"
                        >
                          Cancel Plan
                        </Button>
                      </CardFooter>
                    ) : (
                      <CardFooter>
                        <Button
                          className={`w-full ${
                            selectedPlanName === plan.planName
                              ? "bg-orange-700 hover:bg-orange-700"
                              : "bg-orange-600 hover:bg-orange-700"
                          }`}
                          onClick={() => setSelectedPlanName(plan.planName)}
                        >
                          {selectedPlanName === plan.planName
                            ? "Selected"
                            : subscribedPlan
                            ? "Select"
                            : "Select Plan"}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
        </div>

        {selectedPlanName && !isLoading && (
          <div className="mt-10 text-center">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold"
              onClick={() => {
                if (selectedPlanObj) {
                  subscriptionMutation.mutate(selectedPlanObj.id);
                }
              }}
              disabled={subscriptionMutation.isPending}
            >
              {subscriptionMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : subscribedPlan ? (
                `Switch to ${selectedPlanName} Plan`
              ) : (
                `Subscribe to ${selectedPlanName} Plan`
              )}
            </Button>
            {subscriptionMutation.isError && (
              <p className="mt-2 text-red-500">
                {subscriptionMutation.error instanceof Error
                  ? subscriptionMutation.error.message
                  : "Failed to process subscription. Please try again."}
              </p>
            )}
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Compare Plans</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-gray-400">Feature</th>
                    {plans?.map((plan) => (
                      <th key={plan.planName} className="py-4 px-6 text-white">
                        {plan.planName}
                        {subscribedPlan?.planId === plan.id && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-green-600 rounded-full">
                            Current
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-6 text-gray-400">Monthly price</td>
                    {plans?.map((plan) => (
                      <td key={plan.planName} className="py-4 px-6 text-white">
                        RM{plan.price.toFixed(2)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-6 text-gray-400">Video quality</td>
                    {plans?.map((plan) => (
                      <td key={plan.planName} className="py-4 px-6 text-white">
                        {plan.quality}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
