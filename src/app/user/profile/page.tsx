"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Save,
  CreditCard,
  Lock,
  Trash2,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [cancellationReason, setCancellationReason] = useState("");
  const [isSubscriptionCancelled, setIsSubscriptionCancelled] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

    if (passwordError) setPasswordError("");
  };

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordSuccess(false);

    if (!passwordData.currentPassword) {
      setPasswordError("Current password is required");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Password doesn't match");
      return;
    }

    //call api here
    setTimeout(() => {
      setPasswordSuccess(true);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        const closeButton = document.querySelector(
          "[data-password-dialog-close]"
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
      }, 2000);
    }, 1000);
  };

  const handleCancelSubscription = () => {
    //call api here
    setIsSubscriptionCancelled(true);

    setUser({
      ...user,
      subscription: {
        ...user.subscription,
        plan: "Cancelled",
        price: "$0.00/month",
        nextBillingDate: "N/A",
      },
    });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    alert(
      "Account deleted successfully. You will be redirected to the homepage."
    );
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription className="tetx-gray-400">
                          Enter your current password and a new password below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="currentPassword"
                            className="text-white"
                          >
                            Current Password
                          </Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword" className="text-white">
                            New Password
                          </Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-white"
                          >
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>

                        {passwordError && (
                          <div className="flex items-center text-red-500 text-sm mt-2">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span>{passwordError}</span>
                          </div>
                        )}

                        {passwordSuccess && (
                          <div className="flex items-center text-green-500 text-sm mt-2">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Password changed successfully!</span>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            className="border-gray-700 text-black bg-white hover:bg-gray-500"
                            data-password-dialog-close
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={handleChangePassword}
                          disabled={passwordSuccess}
                        >
                          Update Password
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="txt-gray-400">
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-red-500 text-sm">
                          To confirm, type &quot;DELETE&quot; in the field
                          below:
                        </p>
                        <Input
                          value={deleteConfirmation}
                          onChange={(e) =>
                            setDeleteConfirmation(e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Type DELETE to confirm"
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-700 text-black hover:bg-gray-500">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== "DELETE"}
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                      <h3
                        className={`text-xl font-bold ${
                          isSubscriptionCancelled
                            ? "text-red-500"
                            : "text-orange-500"
                        }`}
                      >
                        {user.subscription.plan}
                      </h3>
                      <p className="text-white text-lg">
                        {user.subscription.price}
                      </p>
                      {!isSubscriptionCancelled && (
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
                      )}
                      {isSubscriptionCancelled && (
                        <div className="mt-2 text-gray-400">
                          <p>
                            Your subscription has been cancelled. You will lose
                            access to premium features at the end of your
                            billing period.
                          </p>
                          <Link href="/user/subscription">
                            <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                              Reactive Subscription
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                    {!isSubscriptionCancelled && (
                      <Link href="/user/subscription">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Change Plan
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {!isSubscriptionCancelled && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">
                        Billing Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <p className="text-gray-400 text-sm">
                            Next billing date
                          </p>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                            <p className="text-white">
                              {user.subscription.nextBillingDate}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <p className="text-gray-400 text-sm">
                            Payment method
                          </p>
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
                  </>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-6">
                {!isSubscriptionCancelled && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-white bg-orange-500 hover:bg-orange-600"
                      >
                        Cancel Subscription
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Cancel Your Subscription?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          You will lose access to premium features at the end of
                          your current billing period. Your subscription will
                          remain active until{" "}
                          {user.subscription.nextBillingDate}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="space-y-4 py-4">
                        <Label
                          htmlFor="cancellationReason"
                          className="text-white"
                        >
                          Please tell us why you&apos;re cancelling (optional)
                        </Label>
                        <select
                          id="cancellationReason"
                          value={cancellationReason}
                          onChange={(e) =>
                            setCancellationReason(e.target.value)
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        >
                          <option value="">Select a reason</option>
                          <option value="too-expensive">Too expensive</option>
                          <option value="not-using">Not using enough</option>
                          <option value="content">Not enough content</option>
                          <option value="technical">Technical issues</option>
                          <option value="switching">
                            Switching to another service
                          </option>
                          <option value="other">Other reason</option>
                        </select>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-700 text-black hover:bg-gray-500">
                          Keep Subscription
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={handleCancelSubscription}
                        >
                          Confirm Cancellation
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
