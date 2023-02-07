import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    console.log(token)
    navigate("/login")
  }
  return (
    <div
    className="grid"
    >Home

      <button
      className="bg-orange-600 px-4 py-2 w-60 mt-5"
      onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Home