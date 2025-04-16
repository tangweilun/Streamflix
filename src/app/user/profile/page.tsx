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
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  registeredOn: string;
  subscribedPlan: string;
}

// const userData = {
//   id: "user123",
//   name: "Alex Johnson",
//   email: "alex.johnson@example.com",
//   avatar: "/placeholder.svg?height=200&width=200",
//   joinDate: "January 2022",
//   subscription: {
//     plan: "Premium",
//     price: "$17.99/month",
//     nextBillingDate: "June 15, 2023",
//     paymentMethod: "Visa ending in 4242",
//   },
//   watchHistory: [
//     {
//       id: "1",
//       title: "Stranger Things",
//       episode: "S4:E8",
//       watchedAt: "2 days ago",
//       progress: 85,
//       image: "/placeholder.svg?height=100&width=180",
//     },
//     {
//       id: "2",
//       title: "The Crown",
//       episode: "S5:E2",
//       watchedAt: "1 week ago",
//       progress: 100,
//       image: "/placeholder.svg?height=100&width=180",
//     },
//     {
//       id: "3",
//       title: "Wednesday",
//       episode: "S1:E5",
//       watchedAt: "2 weeks ago",
//       progress: 45,
//       image: "/placeholder.svg?height=100&width=180",
//     },
//   ],
//   savedContent: [
//     {
//       id: "4",
//       title: "Money Heist",
//       image: "/placeholder.svg?height=100&width=180",
//     },
//     {
//       id: "5",
//       title: "Squid Game",
//       image: "/placeholder.svg?height=100&width=180",
//     },
//     {
//       id: "6",
//       title: "The Witcher",
//       image: "/placeholder.svg?height=100&width=180",
//     },
//   ],
//   preferences: {
//     autoplay: true,
//     notifications: true,
//     emailUpdates: false,
//     subtitles: true,
//     contentLanguage: "English",
//     maturityLevel: "Adult",
//   },
// };

const fetchUserProfile = async (): Promise<User> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/get-profile`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) throw new Error("Failed to fetch user profile.");

    var userData = response.json();

    console.log(userData);

    return userData;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export default function UserProfilePage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
  });

  // const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: user.name,
  //   email: user.email,
  // });

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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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

  // const handleCancelSubscription = () => {
  //   //call api here
  //   setIsSubscriptionCancelled(true);

  //   setUser({
  //     ...user,
  //     subscription: {
  //       ...user.subscription,
  //       plan: "Cancelled",
  //       price: "$0.00/month",
  //       nextBillingDate: "N/A",
  //     },
  //   });
  // };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    alert(
      "Account deleted successfully. You will be redirected to the homepage."
    );
  };

  // const handleSaveProfile = () => {
  //   setUser({
  //     ...user,
  //     name: formData.name,
  //     email: formData.email,
  //   });

  //   setIsEditing(false);
  // };

  return (
    <div className="container mx-auto p-6 pt-10 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-orange-500">
              <AvatarFallback className="bg-gray-800 text-2xl">
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {user?.username}
            </h1>
            <p className="text-gray-400">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              {user?.subscribedPlan ? (
                <Badge className="bg-orange-500 hover:bg-orange-500">
                  {user?.subscribedPlan}
                </Badge>
              ) : (
                <Badge className="bg-gray-500 hover:bg-gray-500">Free</Badge>
              )}
              <Badge className="bg-gray-700 hover:bg-gray-700">
                Member since {user?.registeredOn}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-6">
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
            {/* <CardContent className="space-y-6">
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
              </CardContent> */}
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
                        <Label htmlFor="currentPassword" className="text-white">
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
                        <Label htmlFor="confirmPassword" className="text-white">
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
              {/* <div className="flex items-center justify-between">
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
              </div> */}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle className="text-xl text-white">Danger Zone</CardTitle>
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
                        To confirm, type &quot;DELETE&quot; in the field below:
                      </p>
                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}
