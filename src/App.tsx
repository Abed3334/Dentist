import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { ToastProvider } from "./contexts/ToastContext";

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FAFC]">
      <div className="animate-spin w-10 h-10 border-2 border-[#0F766E] border-t-transparent rounded-full" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <ToastProvider>
        <Suspense fallback={<PageFallback />}>
          <AppRoutes />
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
