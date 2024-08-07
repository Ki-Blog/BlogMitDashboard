import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import Search from "./pages/Search"

export default function App() {
  return (
    <BrowserRouter>
    <Header className="index-z-10"/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<Search />} />
      <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
      <Route path="/create-post" element={<CreatePost/>} />
      <Route path="/update-post/:postId" element={<UpdatePost/>} />
      </Route>
      <Route path="/post/:postSlug" element={<PostPage/>} />
      

    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

