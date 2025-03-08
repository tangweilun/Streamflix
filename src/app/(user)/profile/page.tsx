"use client";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Edit,
  Save,
  Clock,
  CreditCard,
  LogOut,
  Lock,
  UserIcon,
  Settings,
  Trash2,
  PlayCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";

const userData = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=200&width=200",
  joinDate: "January 2022",
  subscription: {
    plan: "Premium",
    price: "$17.99/month",
    nextBillingDate: "June 15, 2023",
    paymentMethod: "Visa ending in 4242",
  },
  watchHistory: [
    {
      id: "1",
      title: "Stranger Things",
      episode: "S4:E8",
      watchedAt: "2 days ago",
      progress: 85,
      image: "/placeholder.svg?height=100&width=180",
    },
    {
      id: "2",
      title: "The Crown",
      episode: "S5:E2",
      watchedAt: "1 week ago",
      progress: 100,
      image: "/placeholder.svg?height=100&width=180",
    },
    {
      id: "3",
      title: "Wednesday",
      episode: "S1:E5",
      watchedAt: "2 weeks ago",
      progress: 45,
      image: "/placeholder.svg?height=100&width=180",
    },
  ],
  savedContent: [
    {
      id: "4",
      title: "Money Heist",
      image: "/placeholder.svg?height=100&width=180",
    },
    {
      id: "5",
      title: "Squid Game",
      image: "/placeholder.svg?height=100&width=180",
    },
    {
      id: "6",
      title: "The Witcher",
      image: "/placeholder.svg?height=100&width=180",
    },
  ],
  preferences: {
    autoplay: true,
    notifications: true,
    emailUpdates: false,
    subtitles: true,
    contentLanguage: "English",
    maturityLevel: "Adult",
  },
};

export default function UserProfilePage() {
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
    });

    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 pt-10 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-orange-500">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gray-800 text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {user.name}
            </h1>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              <Badge className="bg-orange-500 hover:bg-orange-500">
                {user.subscription.plan}
              </Badge>
              <Badge className="bg-gray-700 hover:bg-gray-700">
                Member since {user.joinDate}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-gray-800 border-b border-gray-700 w-full justify-start rounded-none p-0 text-white py-5">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none rounded-none px-6 py-3"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none rounded-none px-6 py-3"
            >
              Subscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white">
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your personal information
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={isEditing ? formData.name : user.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={isEditing ? formData.email : user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 mt-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">Security</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Password</h3>
                    <p className="text-gray-400 text-sm">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                  >
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 mt-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Irreversible account actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Delete Account</h3>
                    <p className="text-gray-400 text-sm">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Current Plan
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your subscription plan and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-orange-500">
                        {user.subscription.plan}
                      </h3>
                      <p className="text-white text-lg">
                        {user.subscription.price}
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>Ultra HD (4K) and HDR</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>Watch on 4 screens at a time</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>Ad-free viewing experience</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>Unlimited downloads on mobile devices</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/subscription">
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Change Plan
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-medium">
                    Billing Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-sm">Next billing date</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                        <p className="text-white">
                          {user.subscription.nextBillingDate}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-sm">Payment method</p>
                      <div className="flex items-center mt-1">
                        <CreditCard className="h-4 w-4 mr-2 text-orange-500" />
                        <p className="text-white">
                          {user.subscription.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                  >
                    Billing History
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                  >
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                >
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
