import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img
                  className="rounded-lg"
                  src="/public/VIBRATE Logo.png"
                  alt=""
                />
              </div>
              <h1 className="text-lg font-bold">VIBRATE</h1>
            </Link>
          </div>
          {/* setting */}
          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link
                  to="/setting"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <Settings className="size-4" />
                  <span className="hidden sm:inline">Setting</span>
                </Link>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
