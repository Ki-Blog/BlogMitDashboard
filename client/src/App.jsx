import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Search from "./pages/Search"
import ScrollToTop from "./components/ScrollToTop"

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header className="index-z-10"/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<Search />} />
      </Routes>

    <Footer />
    </BrowserRouter>
  )
}