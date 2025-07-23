/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { apiClient } from "../libraries/api-client";


export default function TestPage() {
    const [users, setUsers] = React.useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const users = (await apiClient.get("/security/users")) as any[];
            setUsers(users);
            console.log("Fetched users:", users);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchData();
      }, []);

      
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      alo
      {users.map((u) => (
        <div key={u.id} className="p-4 border rounded-lg bg-white shadow mb-4">
          <div className="font-bold">{u.fullName}</div>
          <div className="text-sm text-gray-600">{u.username}</div>
        </div>
      ))}
    </div>
  )
}