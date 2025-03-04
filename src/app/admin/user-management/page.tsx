"use client";

import { useState } from "react";
import { MoreHorizontal, Shield, Trash2, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import AdminNav from "@/components/AdminNav";

type UserRole = "user" | "admin";
type SubscriptionPlan = "free" | "basic" | "premium" | "enterprise";

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "johndoe",
      email: "john.doe@example.com",
      phoneNumber: "+1 (555) 123-4567",
      role: "user",
      subscriptionPlan: "basic",
    },
    {
      id: "2",
      username: "janedoe",
      email: "jane.doe@example.com",
      phoneNumber: "+1 (555) 987-6543",
      role: "admin",
      subscriptionPlan: "premium",
    },
    {
      id: "3",
      username: "bobsmith",
      email: "bob.smith@example.com",
      phoneNumber: "+1 (555) 456-7890",
      role: "user",
      subscriptionPlan: "free",
    },
    {
      id: "4",
      username: "alicejones",
      email: "alice.jones@example.com",
      phoneNumber: "+1 (555) 789-0123",
      role: "user",
      subscriptionPlan: "enterprise",
    },
    {
      id: "5",
      username: "mikebrown",
      email: "mike.brown@example.com",
      phoneNumber: "+1 (555) 234-5678",
      role: "user",
      subscriptionPlan: "basic",
    },
  ]);

  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const text = await response.text();
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Reset password failed.");
      } catch {
        const errorData = JSON.parse(text);
        console.log(errorData);
      }
    } else {
      window.alert("resonpse is ok, admin approve" + response);
    }
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    setDeleteUserId(null);
  };

  const getSubscriptionBadge = (plan: SubscriptionPlan) => {
    switch (plan) {
      case "free":
        return <Badge variant="outline">Free</Badge>;
      case "basic":
        return <Badge className="bg-blue-500">Basic</Badge>;
      case "premium":
        return <Badge className="bg-orange-500">Premium</Badge>;
      case "enterprise":
        return <Badge className="bg-purple-600">Enterprise</Badge>;
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <AdminNav />
      <div className="max-w-6xl mx-auto pt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>

        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-950">
              <TableRow>
                <TableHead className="text-zinc-400">Username</TableHead>
                <TableHead className="text-zinc-400">Email</TableHead>
                <TableHead className="text-zinc-400">Phone Number</TableHead>
                <TableHead className="text-zinc-400">Subscription</TableHead>
                <TableHead className="text-zinc-400">Role</TableHead>
                <TableHead className="text-zinc-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-zinc-800 hover:bg-zinc-800/50"
                >
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    {getSubscriptionBadge(user.subscriptionPlan)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {user.role === "admin" ? (
                        <Shield className="h-4 w-4 mr-1 text-orange-500" />
                      ) : (
                        <UserCog className="h-4 w-4 mr-1 text-zinc-400" />
                      )}
                      <span
                        className={
                          user.role === "admin"
                            ? "text-orange-500 font-medium"
                            : ""
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-300 hover:text-white"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-zinc-900 border border-zinc-700 shadow-md"
                      >
                        <DropdownMenuLabel className="text-gray-200">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-700" />
                        <DropdownMenuItem
                          className="flex items-center cursor-pointer text-gray-300 hover:bg-zinc-800"
                          onClick={() =>
                            handleRoleChange(
                              user.id,
                              user.role === "admin" ? "user" : "admin"
                            )
                          }
                        >
                          {user.role === "admin" ? (
                            <>
                              <UserCog className="mr-2 h-4 w-4 text-blue-400" />
                              <span>Change to User</span>
                            </>
                          ) : (
                            <>
                              <Shield className="mr-2 h-4 w-4 text-blue-400" />
                              <span>Make Admin</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-red-500 hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                          onClick={() => setDeleteUserId(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete User</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AlertDialog
          open={!!deleteUserId}
          onOpenChange={() => setDeleteUserId(null)}
        >
          <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                This action cannot be undone. This will permanently delete the
                user account and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
