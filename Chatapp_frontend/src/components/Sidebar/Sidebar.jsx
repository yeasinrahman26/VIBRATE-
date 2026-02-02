import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, setSelectedUser, selectedUser, users, isUserLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  const showOnline = useChatStore((state) => state.showOnline);
  const setShowOnline = useChatStore((state) => state.setShowOnline);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  const filteredUsers = showOnline
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 flex 
    flex-col transition-all duration-200"
    >
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* todo */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnline}
              onChange={(e) => setShowOnline(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-400">
            ({onlineUsers.length - 1}) online
          </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full  px-2 py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3   p-3 my-2 
                rounded-2xl shadow-xl border border-base-300 cursor-pointer
              transition-all duration-200 ease-in-out
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-2 ring-primary "
                  : "bg-base-100 hover:bg-base-200"
              } 
              focus:outline-none focus:ring-2 focus:ring-primary  `}
          >
            {" "}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.name}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-center text-zinc-500 mt-10">
            No users {showOnline ? "online" : "available"}.
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
