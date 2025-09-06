import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import userImg from "../../assets/placeholder.jpg";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navLinks = (
    <>
      <NavLink
        to={`/`}
        className={({ isActive }) =>
          ` ${isActive ? "text-cyan-500 " : "hover:text-cyan-400"}`
        }>
        Home
      </NavLink>
      <NavLink
        to={`/income`}
        className={({ isActive }) =>
          ` ${isActive ? "text-cyan-500 " : "hover:text-cyan-400"}`
        }>
        Incomes
      </NavLink>
      <NavLink
        to={`/expense`}
        className={({ isActive }) =>
          ` ${isActive ? "text-cyan-500 " : "hover:text-cyan-400"}`
        }>
        Expenses
      </NavLink>
      {!user && (
        <NavLink
          to={`/login`}
          className={({ isActive }) =>
            ` ${isActive ? "text-cyan-500 " : "hover:text-cyan-400"}`
          }>
          Login
        </NavLink>
      )}
    </>
  );
  return (
    <div className=" bg-amber-300 fixed top-0 w-screen z-10 shadow-sm ">
      <div className="navbar justify-between lg:w-10/12 mx-auto py-6">
        <div className="navbar-start w-fit">
          {/* small screen */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className=" p-3 hover:bg-zinc-600/35 rounded-md lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content uppercase bg-base-300 text-black font-bold gap-2 rounded
             mt-3 w-52 p-2 shadow">
              {navLinks}
            </ul>
          </div>
          <Link to={"/"} className="font-bold text-3xl">
            <span className="">Budget</span>
            <span className="text-cyan-500">Buddy</span>
          </Link>
        </div>
        {/* large screen */}
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu hidden lg:flex flex-wrap items-center menu-horizontal uppercase text-white font-bold gap-7 px-1">
            {navLinks}
          </ul>
        </div>

        {!user && (
          <div className="btn btn-ghost btn-circle navbar-end  avatar">
            <div className=" rounded-full">
              <img className="" alt="profile img" src={userImg} />
            </div>
          </div>
        )}
        {user && (
          <div className="dropdown dropdown-end shrink-0 mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-20 rounded-full">
                <img
                  alt="profile img"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || userImg}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 shadow">
              <li className="p-1 rounded justify-between hover:bg-slate-300 text-black font-semibold">
                {user?.displayName}
              </li>
              <li>
                <a
                  onClick={signOutUser}
                  className="cursor-pointer hover:bg-slate-300 text-base font-bold text-red-500 hover:text-red-700">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
