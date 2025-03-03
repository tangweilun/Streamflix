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
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "RM35.99",
    features: [
      "Watch on 1 screen at a time",
      "Unlimited movies and TV shows.",
      "Watch on your laptop, TV, phone, and tablet.",
      "Cancel anytime.",
    ],
    quality: "Good",
  },
  {
    name: "Standard",
    price: "RM55.99",
    features: [
      "Watch on 2 screens at a time",
      "Unlimited movies and TV shows.",
      "Full HD (1080p)",
      "Watch on your laptop, TV, phone, and tablet.",
      "Cancel anytime.",
    ],
    quality: "Better",
  },
  {
    name: "Premium",
    price: "RM79.99",
    features: [
      "Watch on 5 screens at a time",
      "Unlimited movies and TV shows.",
      "Ultra HD (4K) and HDR",
      "Watch on your laptop, TV, phone, and tablet.",
      "Cancel anytime.",
    ],
    quality: "Best",
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-2">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
            Choose Your Plan
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Select the perfect streaming plan for you
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between bg-gray-900 border-2 ${
                selectedPlan === plan.name
                  ? "border-orange-700"
                  : "border-gray-700"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {plan.quality}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-extrabold text-white">
                  {plan.price}
                  <span className="text-xl font-medium text-gray-400">
                    {" "}
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-orange-500" />
                      </div>
                      <p className="ml-3 text-base text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    selectedPlan === plan.name
                      ? "bg-orange-700 hover:bg-orange-700"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-10 text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold">
              Continue with {selectedPlan} Plan
            </Button>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-gray-400">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="py-4 px-6 text-white">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-400">Monthly price</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 px-6 text-white">
                      {plan.price}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-400">Video quality</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 px-6 text-white">
                      {plan.quality}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-400">Resolution</td>
                  <td className="py-4 px-6 text-white">720p</td>
                  <td className="py-4 px-6 text-white">1080p</td>
                  <td className="py-4 px-6 text-white">4K + HDR</td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-400">
                    Screens you can watch on at the same time
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 px-6 text-white">
                      {plan.name === "Basic"
                        ? "1"
                        : plan.name === "Standard"
                        ? "2"
                        : "5"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
