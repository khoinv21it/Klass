import { useEffect } from "react";
import apiClient from "../libraries/api-client-advanced";
import React from "react";



export default function RolesPage() {
    const[roles ,setRoles] = React.useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const roles = (await apiClient.get("/security/roles")) as any[];
            setRoles(roles);
          } catch (error) {
            console.error("Error fetching roles:", error);
          }
        };
        fetchData();
      }, []);
  return (
    <div>
        {roles.map((role) => (
            <div key={role.id} className="p-4 border-b">
                <div>{role.id}</div>
                <div className="font-bold">{role.name}</div>
                <div className="text-gray-600">{role.description}</div>
            </div>
        ))}
    </div>
  )
}