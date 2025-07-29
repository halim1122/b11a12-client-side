import { NavLink, Outlet } from "react-router";
import Logo from "../../Sheared/Logo/Logo";
import {
  FaHome,
  FaUser,
  FaBook,
  FaPlusCircle,
  FaUserTie,
  FaUsersCog,
  FaRegListAlt
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TbBrandStorybook, TbUserSearch } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import Footer from "../../Sheared/Footer/Footer";
import useAuthContext from "../../Hook/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const DashboardLayout = () => {

  const { user } = useAuthContext();
  const axiosInstance = useAxiosSecure();

  const { data: dbUser = {}, isLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <LoadingSpinner />
  refetch();
  console.log(dbUser?.email,user?.email)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for small screens */}
        <header className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-semibold text-lg">
            Dashboard
          </div>
        </header>

        {/* Outlet renders nested routes */}
        <main className="p-4">
          <Outlet />
          <Footer></Footer>
        </main>
      </div>

      {/* Sidebar */}
      <aside className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

        <nav className="menu bg-base-200 space-y-2 text-base-content min-h-full md:w-56 w-44 p-4">
          {/* Logo */}
          <div className="mb-6">
            <Logo />
          </div>

          {/* Menu Items */}

          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaHome /> Home
              </NavLink>
            </li>
            {dbUser.role === 'user' && <>
            <li> {/*  manege profile */}
              <NavLink
                to="/dashboard/manageProfile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaUser /> Manage Profile
              </NavLink>
            </li>
            <li>{/*  My Bookings */}
              <NavLink
                to="/dashboard/myBookings"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaRegListAlt /> My Bookings
              </NavLink>
            </li>
            <li> {/* Payment History */}
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <MdPayment /> Payment History
              </NavLink>
            </li>
            <li>{/* Join As Tour Guide*/}
              <NavLink
                to="/dashboard/joinAsTourGuide"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaUserTie /> Join As Tour Guide
              </NavLink>
            </li></>}
            {(dbUser.role === "tour-guide") && (<>
              <li> {/*  manege profile */}
              <NavLink
                to="/dashboard/managesProfile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaUser /> Manage Profile
              </NavLink>
            </li>
              <li> {/* My Assigned Tour*/}
              <NavLink
                to="/dashboard/myAssignedTour"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaBook /> My Assigned Tour
              </NavLink>
            </li></>)}
            {dbUser.role === "admin" && <><li>{/*Manage Profile A*/}
              <NavLink
                to="/dashboard/manageProfileAdmin"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaUsersCog /> Manage Profile
              </NavLink>
            </li>
            <li>{/* Add Package A*/}
              <NavLink
                to="/dashboard/addPackage"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <IoIosAddCircle /> Add Package
              </NavLink>
            </li>
            <li>{/*  Manage Users A*/}
              <NavLink
                to="/dashboard/manageUsers"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaUsersCog /> Manage Users
              </NavLink>
            </li>
            <li>{/*  Manage Candidates A*/}
              <NavLink
                to="/dashboard/manageCandidates"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <TbUserSearch /> Manage Candidates
              </NavLink>
            </li></>}
            <li>{/*  Manage Stories*/}
              <NavLink
                to="/dashboard/manageStories"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <TbBrandStorybook /> Manage Stories
              </NavLink>
            </li>
            <li>{/*  Add Stories*/}
              <NavLink
                to="/dashboard/addStories"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 ${isActive ? "bg-[#007777] text-white" : ""
                  }`
                }
              >
                <FaPlusCircle /> Add Stories
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default DashboardLayout;
