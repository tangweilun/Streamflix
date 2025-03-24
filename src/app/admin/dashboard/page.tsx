"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, Film } from "lucide-react";

const subscriptionData = [
  { name: "Basic", value: 540 },
  { name: "Standard", value: 620 },
  { name: "Premium", value: 210 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white mx-auto px-6 pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-500">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Welcome back, Admin.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-1">24,532</h3>
                </div>
                <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Videos
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-1">3,672</h3>
                </div>
                <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full">
                  <Film className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Subscription Distribution
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Active subscriptions by plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart style={{ pointerEvents: "none" }}>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#333",
                          border: "none",
                        }}
                        itemStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  {subscriptionData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="text-sm text-gray-400">
                        {entry.name}: {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
