import { useState } from "react";
import { useNavigate } from "react-router-dom";
const profileimg = require("../../assets/downloadprofile.png");

function Header({ isOpen, setIsOpen }) {
  const [isProfileopen, setisProfileopen] = useState();
  const navigate = useNavigate();

  return (
    <>
      <nav
        class="flex justify-end px-4 py-[8px] z-10 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 fixed w-[83vw] h-[50px]"
        aria-label="Breadcrumb"
      >
        <div
          className=""
          onClick={() => setisProfileopen(!isProfileopen)}
        >
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            class="inline-flex items-center px-7 pt-[1px] pb-[1px] text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
          >
            <img
              src={profileimg}
              style={{ height: "30px", width: "30px" }}
              alt="noImage"
            />
            Rohit Pal
            <svg
              class="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            onClick={() => {
              navigate("/login");
            }}
            class={`z-10 relative ${
              isProfileopen ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <p
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Log Out
                </p>
              </li>
              {/* <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Rename</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
