import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BrowseWords from "./components/words/BrowseWords"
import Plans from "./components/plans/Plans"
import UserProfile from "./components/profile/UserProfile"
import PageNotFound from "./components/404/PageNotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse/words" element={<BrowseWords />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
