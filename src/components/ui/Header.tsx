import { useDispatch, useSelector } from "react-redux";
import type { StoreType } from "../../store";
import { authActions } from "../../store/auth-slice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, type MouseEvent } from "react";

const Header = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const loginState = useSelector((store: StoreType) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDropDown = ["opacity-100", "scale-100"];
  function onLogOutHandler(e: MouseEvent) {
    e.preventDefault();
    dispatch(authActions.logoutUser());
    navigate("/");
  }

  let location = useLocation();

  useEffect(() => {
    setDropdown(false);
  }, [location]);
  return (
    <div className='w-full border-b border-gray-700 sticky top-0' style={{ backdropFilter: "blur(5px)" }}>
      {/* <div className='mx-auto px-2 py-4'></div> */}
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Left: Nav Links */}
        <div className='flex space-x-6 items-center'>
          <div className='text-2xl font-extrabold tracking-wide'>MyBlog</div>
          {loginState.login && (
            <>
              <NavLink
                to='/'
                className='text-white hover:text-gray-300'
                style={({ isActive }) => (isActive ? { textDecoration: "underline" } : undefined)}
                end
              >
                Home
              </NavLink>
              <NavLink
                to='/blogs'
                className='text-white hover:text-gray-300'
                style={({ isActive }) => (isActive ? { textDecoration: "underline" } : undefined)}
                end
              >
                Blogs
              </NavLink>
            </>
          )}
        </div>

        {/* Right: User Dropdown */}
        {loginState.login && (
          <div className='relative'>
            <button
              className='text-sm text-gray-300 hover:text-white focus:outline-none cursor-pointer'
              id='userMenuButton'
              onClick={() => setDropdown((p) => !p)}
            >
              Welcome, <span className='font-semibold text-white'>{loginState.user.firstName}</span>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`z-[1000] absolute right-0 mt-2 w-40 border [&>*]:mt-1 bg-gray-950 border-gray-700 rounded-md shadow-lg cursor-pointer transition ease-out duration-200 transform opacity-0 scale-95 p-2 ${
                dropdown ? showDropDown.join(" ") : ""
              }`}
              // onClick={() => setDropdown(false)}
              id='userMenu'
            >
              <NavLink
                to='/profile/blogs/new'
                className='text-white bg-gray-900 px-4 py-2 w-full text-center flex gap-2 items-center justify-center hover:bg-gray-800 rounded'
              >
                Add Blog
              </NavLink>
              <NavLink
                to='/profile/blogs'
                className='text-white bg-gray-900 px-4 py-2 w-full text-center flex gap-2 items-center justify-center hover:bg-gray-800 rounded'
              >
                My Blogs
              </NavLink>
              <button
                className='w-full text-left cursor-pointer px-4 py-2 rounded text-sm bg-red-950 text-white hover:bg-red-900 flex gap-2 items-center justify-center'
                onClick={onLogOutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
