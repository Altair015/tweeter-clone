import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Loader } from "./components";
import { AuthProvider, DataProvider } from "./contexts";
import router from "./routes";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
