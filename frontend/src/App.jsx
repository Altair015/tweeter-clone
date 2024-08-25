import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Loader } from "./components";
import { AuthProvider, DataProvider, ToastifyProvider } from "./contexts";
import router from "./routes";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ToastifyProvider>
        <AuthProvider>
          <DataProvider>
            <RouterProvider router={router} />
          </DataProvider>
        </AuthProvider>
      </ToastifyProvider>
    </Suspense>
  );
}

export default App;
