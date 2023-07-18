import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { removeUser } from "../redux/features/user/userSlice";

export default function Navbar() {
  const userId = useAppSelector((state) => state.userState.userId);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };
  return (
    <div className="navbar bg-blue-400">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-white text-xl" to="/">
          book
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div className="flex items-center space-x-2">
            <Link
              title="wishlist"
              to="/wishlist"
              tabIndex={0}
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* <span className="badge badge-sm indicator-item"></span> */}
              </div>
            </Link>
            <Link
              title="Reading List"
              className="btn btn-ghost btn-circle"
              to="/readingList"
            >
              <img
                className="w-6"
                src="/src/assets/icons8-add-book-100.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/src/assets/icons8-person-60.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 border-4 border-green-400 rounded-box w-52"
          >
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li> */}
            {!userId && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
            {userId && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
