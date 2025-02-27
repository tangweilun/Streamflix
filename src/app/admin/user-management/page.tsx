// "use client";
// import { UserPlus, Edit, Eye, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export default function UserManagementPage() {
//   return (
//     <div className="container mx-auto py-10">
//       <div className="flex items-center justify-between space-y-2">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
//           <p className="text-muted-foreground">
//             Manage user accounts and permissions for your video streaming
//             platform.
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button className="bg-primary text-primary-foreground hover:bg-secondary">
//             <UserPlus className="mr-2 h-4 w-4" />
//             Add New User
//           </Button>
//         </div>
//       </div>
//       <div className="mt-6 space-y-4">
//         <div className="flex items-center space-x-2">
//           <Input placeholder="Search users..." className="max-w-sm" />
//         </div>
//         <div className="rounded-md border border-border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone Number</TableHead>
//                 <TableHead>Date of Birth</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell className="font-medium">{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phoneNumber}</TableCell>
//                   <TableCell>{user.dob}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
//                       >
//                         <Edit className="h-4 w-4" />
//                         <span className="sr-only">Edit</span>
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
//                       >
//                         <Eye className="h-4 w-4" />
//                         <span className="sr-only">View</span>
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         <span className="sr-only">Delete</span>
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }
//"use client";

//import { useEffect, useState } from "react";

//export default function UsersPage() {/
//   const [users, setUsers] = useState<unknown[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         // const clientToken = document.cookie
//         //   .split("; ")
//         //   .find((row) => row.startsWith("clientToken="))
//         //   ?.split("=")[1];

//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//           method: "GET",
//           //   headers: {
//           //     // Include token in Authorization header
//           //     Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNzQwNDcwMzk5LCJleHAiOjE3NDA1NTY3OTksImlhdCI6MTc0MDQ3MDM5OX0.59ibUgZokcdbZ-0mIGnrp-YPu69aZeQU3faybfbunLOJbWFhXHD0iDLLDpJ51sYVVKeO81nftO-dnQ1Yhra6lw`,
//           //     "Content-Type": "application/json",
//           //   },
//           // Also send cookies (as backup)
//           credentials: "include",
//         });
//         if (!res.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await res.json();
//         setUsers(data);
//       } catch (err) {
//         setError((err as Error).message);
//       }
//     }

//     fetchUsers();
//   }, []);

// return (
//<div>
{
  /* <h1>Users List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */
}
//  </div>
// );
//}
