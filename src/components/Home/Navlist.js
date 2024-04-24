import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectName,
  selectRole,
  SET_USER,
  SET_LOGIN,
  SET_NAME,
  SET_ROLE,
} from "../../redux/features/auth/authSlice";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Notification from "../Home/notification";
import "@fontsource/rubik"; 
import Navinfo from "./Navinfo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navlist({ handleLogout }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectName);
  const role = useSelector(selectRole); 
  const dispatch = useDispatch();

  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Scholarship", href: "/scholarships", current: false },
    { name: "Blog", href: "/blogs", current: false },
    { name: "Chats", href: "/chats", current: false },
    ...(role == "admin"
      ? [{ name: "Admin", href: "/admin", current: false }]
      : []),
  ];

  const account = [
    { name: "Register", href: "/signup", current: false },
    { name: "Login", href: "/login", current: false },
  ];

  const onLogoutClick = () => {
    dispatch(SET_LOGIN(false));
    dispatch(SET_NAME(""));
    dispatch(SET_ROLE(""));
    dispatch(SET_USER({ name: "", email: "" }));
    handleLogout();
  };

  return (
    <>
      <Navinfo />
      <nav className="  sticky top-0 z-50 py-1 text-black bg-gradient-to-b  from-gray-100 to-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm text-center border border-gray-700">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:text-red-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <CloseIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <DehazeIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center justify-center">
                      <div className="flex flex-col justify-center content-center items-center">
                      <Link to={"/"}>
                        <img src={logo} alt="Logo" className="h-10 w-10" />
                      </Link>
                      </div>
                      
                      {isLoggedIn && (
                        <div className=" absolute right-1">
                          <div className="flex space-x-4 sm:ml-6 sm:hidden">
                            <Notification />

                            <Menu as="div" className="relative ml-3 ">
                              <div>
                                <Menu.Button className="relative flex rounded-full bg-gray-100 text-sm border-2 border-red-400 hover:border-red-500 hover:bg-red-500 focus:outline-none">
                                  <span className="absolute -inset-1.5" />
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <img
                                    className="h-8 w-8  my-auto rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0  mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  z-50">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to="/profile"
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          " w-full block px-4 py-2 text-sm text-gray-700 "
                                        )}
                                      >
                                        Your Profile
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={onLogoutClick} // Call the onLogoutClick function when the button is clicked
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          " w-full block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        Sign out
                                      </button>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-black"
                                : "hover:text-white hover:underline text-gray-900 hover:bg-red-500 transition-all duration-500 ease-in-out transform hover:translate-y-1 shadow-2xl ",
                              "px-3 py-2 rounded-lg text-sm font-medium mt-1"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {isLoggedIn ? (
                        <>
                          <Notification />

                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex rounded-full bg-gray-100 text-sm border-2 border-red-400 hover:border-red-500 hover:bg-red-500 focus:outline-none transition delay-100">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 ml-0.5 my-auto rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                                <span className="m-2  hover:bg-red-600 hover:text-white">
                                  {name}
                                </span>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0  mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  z-50">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/profile"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        " w-full block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Your Profile
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={onLogoutClick} // Call the onLogoutClick function when the button is clicked
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        " w-full block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Sign out
                                    </button>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </>
                      ) : (
                        account.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "hover:text-white hover:underline text-gray-900 hover:bg-red-500 transition-all duration-500 ease-in-out transform hover:translate-y-1 shadow-2xl ",
                              "px-3 py-2 rounded-lg text-sm font-medium mt-1"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : " hover:bg-red-500  hover:text-white hover:underline text-gray-900",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  {!isLoggedIn &&
                    account.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : " hover:bg-red-500  hover:text-white hover:underline text-gray-900",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </>
  );
}

export { classNames };
