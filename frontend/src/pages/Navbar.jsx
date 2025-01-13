import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu
  const [hasToken, setHasToken] = useState(false); // State to check token presence
  const navigate = useNavigate();
  
  // Function to check token presence
  const checkToken = () => {
    const token =  localStorage.getItem("token");
    setHasToken(!!token); // Set true if token exists, false otherwise
  };

  // Run on component mount and whenever login/logout triggers
  useEffect(() => {
    checkToken();
  }, []); // Dependency array is empty, so it runs only on mount

  const token = localStorage.getItem('token');
  const handleLogout =async ()=>{
    try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/login');
    }
        
    } catch (error) {
        console.log('error during logout',error)
    }
}

  const handleLoginNavigate = () => {
    // Simulate login (replace this with actual login logic)
    navigate("/login"); // Redirect to profile
    setIsMenuOpen(false); // Close the menu
  };

  const handleSignupNavigate = () => {
    navigate("/signup");
    setIsMenuOpen(false); // Close the menu after navigation
  };

  const handleUserNavigate = () => {
    navigate("/profile"); // Navigate to user profile
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <nav
      className={`bg-black text-white p-4 transition-all duration-500 ${
        isMenuOpen ? "h-auto" : "h-[70px]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-semibold">RapidCap</div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          {hasToken ? (
            <>
              <button
                onClick={handleUserNavigate}
                className="text-white px-4 py-2 hover:text-black hover:bg-gray-200"
              >
                User
              </button>
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 hover:text-black hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginNavigate}
                className="text-white px-4 py-2 bg-gray-700 rounded-full hover:text-black hover:bg-gray-200"
              >
                Log in
              </button>
              <button
                onClick={handleSignupNavigate}
                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`lg:hidden mt-2 bg-black p-4 rounded-md shadow-md transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {hasToken ? (
          <>
            <button
              onClick={handleUserNavigate}
              className="block bg-gray-600 text-white rounded-full px-6 py-2 text-left my-2 hover:bg-gray-800"
            >
              User
            </button>
            <button
              onClick={handleLogout}
              className="block bg-gray-600 text-white rounded-full px-6 py-2 text-left hover:bg-gray-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLoginNavigate}
              className="block bg-gray-600 text-white rounded-full px-6 py-2 text-left my-2 hover:bg-gray-800"
            >
              Log in
            </button>
            <button
              onClick={handleSignupNavigate}
              className="block bg-gray-600 text-white rounded-full px-6 py-2 text-left my-2 hover:bg-gray-300"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;