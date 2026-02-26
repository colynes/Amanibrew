import { useState } from "react";
import { Plus, Search, Edit, Trash2, Shield, Lock, Mail } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "Manager" | "Staff";
  status: "Active" | "Inactive";
  lastLogin: string;
  createdAt: string;
}

export function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");

  const users: User[] = [
    {
      id: "USR-001",
      name: "Admin User",
      email: "admin@amanibrew.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "2026-02-26 09:30",
      createdAt: "2025-01-01",
    },
    {
      id: "USR-002",
      name: "John Manager",
      email: "john.manager@amanibrew.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2026-02-26 08:15",
      createdAt: "2025-06-15",
    },
    {
      id: "USR-003",
      name: "Sarah Staff",
      email: "sarah.staff@amanibrew.com",
      role: "Staff",
      status: "Active",
      lastLogin: "2026-02-25 16:45",
      createdAt: "2025-09-01",
    },
    {
      id: "USR-004",
      name: "Mike Employee",
      email: "mike.employee@amanibrew.com",
      role: "Staff",
      status: "Active",
      lastLogin: "2026-02-26 07:20",
      createdAt: "2025-11-10",
    },
    {
      id: "USR-005",
      name: "Lisa Former",
      email: "lisa.former@amanibrew.com",
      role: "Staff",
      status: "Inactive",
      lastLogin: "2026-01-15 14:30",
      createdAt: "2025-03-20",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const activeUsers = users.filter((u) => u.status === "Active").length;
  const administrators = users.filter((u) => u.role === "Administrator").length;
  const managers = users.filter((u) => u.role === "Manager").length;
  const staff = users.filter((u) => u.role === "Staff").length;

  const getRoleBadgeColor = (role: User["role"]) => {
    switch (role) {
      case "Administrator":
        return "bg-red-100 text-red-700";
      case "Manager":
        return "bg-blue-100 text-blue-700";
      case "Staff":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: User["status"]) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Admin Warning Banner */}
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-orange-900">Administrator Access Only</h4>
            <p className="mt-1 text-sm text-orange-700">
              This section is restricted to administrators. User management, roles, and permissions can only be modified by users with administrator privileges.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>User Management</h1>
          <p className="text-muted-foreground">Manage system users and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{activeUsers}</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <Shield className="h-6 w-6 text-red-700" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{administrators}</p>
            <p className="text-sm text-muted-foreground">Administrators</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Shield className="h-6 w-6 text-blue-700" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{managers}</p>
            <p className="text-sm text-muted-foreground">Managers</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Shield className="h-6 w-6 text-green-700" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{staff}</p>
            <p className="text-sm text-muted-foreground">Staff Members</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
          >
            <option value="All">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Last Login</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm text-primary">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{user.lastLogin}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{user.createdAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Lock className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6">
            <h2 className="mb-4">Add New User</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Email Address</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="user@amanibrew.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Role</label>
                <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                  <option>Staff</option>
                  <option>Manager</option>
                  <option>Administrator</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm">Password</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Confirm Password</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Confirm password"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
