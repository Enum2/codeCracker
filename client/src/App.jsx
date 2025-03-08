import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender";
import SheetTracker from "./pages/SheetTracker";
import AccountTracker from "./pages/AccountTracker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 50 * 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calender" element={<Calender />} />
            <Route path="codingStats" element={<AccountTracker />} />
            <Route path="SheetTracker" element={<SheetTracker />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "14px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
