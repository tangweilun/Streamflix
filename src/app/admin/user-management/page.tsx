"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MoreHorizontal, Shield, Trash2, UserCog, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
}

// Fetch all users
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/fetch-all-users`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return response.json();
};

export default function UserManagement() {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const roleMutation = useMutation({
    mutationFn: async ({
      userId,
      isAdmin,
    }: {
      userId: string;
      isAdmin: boolean;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/update-user-role/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(isAdmin),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("User role updated successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/delete-user/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    },
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredUsers = users?.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto pt-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-orange-500">
            User Management
          </h1>
        </div>

        <div className="mb-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search by username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 w-full"
            />
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-950">
              <TableRow>
                <TableHead className="text-zinc-400">Username</TableHead>
                <TableHead className="text-zinc-400">Email</TableHead>
                <TableHead className="text-zinc-400">Phone Number</TableHead>
                <TableHead className="text-zinc-400">Role</TableHead>
                <TableHead className="text-zinc-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index} className="border-zinc-800">
                      <TableCell className="py-4">
                        <div className="animate-pulse bg-zinc-800 h-5 rounded w-[100px]" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="animate-pulse bg-zinc-800 h-5 rounded w-[200px]" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="animate-pulse bg-zinc-800 h-5 rounded w-[120px]" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="animate-pulse bg-zinc-800 h-5 w-5 rounded" />
                          <div className="animate-pulse bg-zinc-800 h-5 rounded w-[80px]" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex justify-end">
                          <div className="animate-pulse bg-zinc-800 h-8 w-8 rounded hover:bg-zinc-700 transition-colors" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : filteredUsers?.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-zinc-800 hover:bg-zinc-800/50"
                    >
                      <TableCell className="font-medium">
                        {user.userName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {user.isAdmin ? (
                            <Shield className="h-4 w-4 mr-1 text-orange-500" />
                          ) : (
                            <UserCog className="h-4 w-4 mr-1 text-zinc-400" />
                          )}
                          <span
                            className={
                              user.isAdmin ? "text-orange-500 font-medium" : ""
                            }
                          >
                            {user.isAdmin ? "Admin" : "User"}
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
                                roleMutation.mutate({
                                  userId: user.id,
                                  isAdmin: user.isAdmin ? false : true,
                                })
                              }
                            >
                              {user.isAdmin ? (
                                <Shield className="mr-2 h-4 w-4 text-blue-400" />
                              ) : (
                                <UserCog className="mr-2 h-4 w-4 text-blue-400" />
                              )}
                              <span>
                                {user.isAdmin ? "Change to User" : "Make Admin"}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center text-red-500 hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                              onClick={() => deleteMutation.mutate(user.id)}
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
      </div>
    </div>
  );
}
