import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();


  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/setting"
          element={authUser ? <SettingPage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
