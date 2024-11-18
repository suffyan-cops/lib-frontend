import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout"
import AdminGuard from "./services/authorizations"
import UnAuthorizedPage from "./pages/404page"
import NotFoundPage from "./pages/notFound"

const LoginPage = lazy(() => import("./pages/auth/loginPage"));
const BookPage = lazy(() => import("./pages/book"));
const LibraryPage = lazy(() => import("./pages/library"));
const MemberPage = lazy(() => import("./pages/member"));
const RequestPage = lazy(() => import("./pages/request"));
const HomePage = lazy(() => import("./pages/home"));
const UserPage = lazy(() => import("./pages/user"));
function App() {

  const privateRoutes = [
    {
      name: "user",
      path: '/user',
      component: <UserPage />,
      guard: ["super_admin"]
    },
    {
      name: "book",
      path: '/book',
      component: <BookPage />,
      guard: ["super_admin", "reader", "librarian"]
    },
    {
      name: "library",
      path: '/library',
      component: <LibraryPage />,
      guard: ["super_admin"]
    },
    {
      name: "request",
      path: '/request',
      component: <RequestPage />,
      guard: ["super_admin", "reader", "librarian"]
    },
    {
      name: "member",
      path: '/member',
      component: <MemberPage />,
      guard: ["super_admin", "librarian"]
    },
    {
      name: "dashboard",
      path: '/dashboard',
      component: <HomePage />,
      guard: ["super_admin", "reader", "librarian"]
    }
  ]

  return (
    <>
      <Router>
        <div className="relative bg-secondary !h-screen">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <Routes>
              {privateRoutes.map((item, index) =>
                <Route
                  key={index}
                  path={item.path}
                  element={<AdminGuard guard={item.guard}><Layout children={item.component} name={item.name} /></AdminGuard>}
                />
              )}
              <Route path="/" element={<LoginPage />} />
              <Route path="/404" element={<UnAuthorizedPage />} />
              <Route path="*" element={< NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>

      </Router>

    </>
  )
}

export default App
