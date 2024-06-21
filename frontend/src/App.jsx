import { Suspense } from "react";
import router from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
