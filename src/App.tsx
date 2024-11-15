import LoginPage from "./pages/auth/loginPage"
import BookPage from "./pages/book"
import LibraryPage from "./pages/library"
import MemberPage from "./pages/member"
import RequestPage from "./pages/request"
import HomePage from "./pages/home"
import UserPage from "./pages/user"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout"
import AdminGuard from "./services/authorizations"
import UnAuthorizedPage from "./pages/404page"
import NotFoundPage from "./pages/notFound"
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
        </div>
      </Router>
    </>
  )
}

export default App
