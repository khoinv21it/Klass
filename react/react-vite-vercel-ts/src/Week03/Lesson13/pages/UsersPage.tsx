import React, { useEffect } from "react";
import { apiClient } from "../libraries/api-client";

type Props = {};

export default function UsersPage({}: Props) {
  const [users, setUsers] = React.useState<any[]>([]);
  const [roleById, setRoleById] = React.useState<Record<number, any[]>>({});
  const [showAddRoleModal, setShowAddRoleModal] = React.useState(false);
  const [allRoles, setAllRoles] = React.useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [selectedRoles, setSelectedRoles] = React.useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = (await apiClient.get("/security/users")) as any[];
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [selectedRoles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesMap: Record<number, any[]> = {};
        await Promise.all(
          users.map(async (user) => {
            const detail = await apiClient.get(`/security/users/${user.id}`);
            const userDetail = detail.data || detail;
            rolesMap[user.id] = userDetail.roles || [];
          })
        );
        setRoleById(rolesMap);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    if (users.length > 0) {
      fetchData();
    }
  }, [users]);

  // Fetch all roles when modal is opened
  useEffect(() => {
    if (showAddRoleModal) {
      const fetchRoles = async () => {
        try {
          const res = await apiClient.get("/security/roles");
          setAllRoles(res.data || res);
        } catch (err) {
          setAllRoles([]);
        }
      };
      fetchRoles();
    }
  }, [showAddRoleModal]);
  

  const [fullName, setFullName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !username.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await apiClient.post("/security/users", {
        fullName: fullName.trim(),
        username: username.trim(),
      });
      // Reload user list from API to ensure correct data
      const users = (await apiClient.get("/security/users")) as any[];
      setUsers(users);
      setFullName("");
      setUsername("");
    } catch (err) {
      alert("Failed to add user");
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="mb-4 flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            type="text"
            placeholder="full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            name="fullName"
            className="border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            placeholder="user name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            name="username"
            className="border rounded px-2 py-1"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users.map((user) => {
          const roles = roleById[user.id] || [];
          return (
            <div
              key={user.id}
              className="p-4 border rounded-lg bg-white shadow flex flex-col justify-between"
            >
              <div>
                <div className="font-bold text-lg mb-1">{user.fullName}</div>
                <div className="text-gray-600 mb-2">
                  {roles.length === 0 ? (
                    <span className="italic text-red-500">Chưa có vai trò</span>
                  ) : (
                    roles.map((role) => (
                      <span
                        key={role.id}
                        className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded mr-2 text-sm mb-1"
                      >
                        {role.name}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Bạn có chắc muốn xóa user ${user.fullName}?`
                      )
                    ) {
                      try {
                        await apiClient.delete(`/security/users/${user.id}`);
                        setUsers((prev) => prev.filter((u) => u.id !== user.id));
                      } catch (err) {
                        alert("Xóa user thất bại!");
                      }
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowAddRoleModal(true);
                  }}
                >
                  Add roles
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Roles */}
      {showAddRoleModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw]">
            <div className="font-bold text-lg mb-4">
              Gán vai trò cho user:{" "}
              <span className="text-blue-600">{selectedUser?.fullName}</span>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Chọn vai trò:</label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {allRoles.map((role) => (
                  <label
                    key={role.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRoles((prev) => [...prev, role.id]);
                        } else {
                          setSelectedRoles((prev) =>
                            prev.filter((id) => id !== role.id)
                          );
                        }
                      }}
                    />
                    <span>{role.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={async () => {
                  if (!selectedUser) return;
                  try {
                    await apiClient.put(
                      `/security/users/${selectedUser.id}/add-roles-to-user`,
                      {
                        role_ids: selectedRoles,
                      }
                    );
                    setShowAddRoleModal(false);
                  } catch (err) {
                    alert("Gán vai trò thất bại!");
                  }
                }}
              >
                Add roles
              </button>
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowAddRoleModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
