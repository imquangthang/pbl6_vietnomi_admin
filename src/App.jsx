import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import { use, useEffect } from "react";
import { LoadingProvider } from "./widgets/layout/loading-context/LoadingContext";
import DotLoaderScreen from "./widgets/layout/loading-context/DotLoaderScreen";

function App() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  var loading_page = localStorage.getItem("loading") === "true";

  function ProtectedRoute({ user, children }) {
    if (!user) {
      return <Navigate to="/auth/sign-in" replace />;
    }
    return children;
  }

  useEffect(() => {
    loading_page = localStorage.getItem("loading") === "true";
  }, [loading_page]);

  return (
    <LoadingProvider>
      {/* Routes */}
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
      {/* <ToastContainer> */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={"z-[10000]"}
      />
      <DotLoaderScreen />
    </LoadingProvider>
  );
}

export default App;
