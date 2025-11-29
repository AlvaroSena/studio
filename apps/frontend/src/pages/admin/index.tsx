import { Navigate } from "react-router-dom";

export function Admin() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Navigate to="/studios" replace />;
    </div>
  );
}
