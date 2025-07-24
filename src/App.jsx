import { Route, Routes } from "react-router-dom"
import About from "./components/Landing/About"
import Hero from "./components/Landing/Hero"
import Navbar from "./components/Navbar/Navbar"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import Register from "./pages/Register"
import Appointments from "./pages/Appointments"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
