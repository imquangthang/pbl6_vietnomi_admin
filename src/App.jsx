import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import { use, useEffect } from "react";

function App() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  function ProtectedRoute({ user, children }) {
    if (!user) {
      return <Navigate to="/auth/sign-in" replace />;
    }
    return children;
  }
  
  return (
    <>
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
        />
      </>
  );
}

export default App;
