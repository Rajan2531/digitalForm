// import { useAdminQuery } from "../hooks/useAdminQuery";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const { data, isLoading } = useAdminQuery();

//   if (isLoading) return <div>Loading...</div>;

//   if (!data) return <Navigate to="/login" replace />;

//   return children;
// }


import { useAdminQuery } from "../hooks/useAdminQuery";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { data, isPending, isFetching, isError } = useAdminQuery();

  // 🚀 ALWAYS WAIT for query + for axios refresh attempts
  if (isPending || (isFetching && !isError)) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Restoring session...
      </div>
    );
  }
  console.log(data)
  // ❌ Only redirect AFTER refresh and retry are complete
  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
