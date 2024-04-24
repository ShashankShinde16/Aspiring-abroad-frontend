import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { selectName, selectRole } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { classNames } from "./Navlist";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const name = useSelector(selectName);
  const role = useSelector(selectRole);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let response;
        if (role === "admin") {
          response = await axios.get(
            `${process.env.REACT_APP_RENDER_URL}/admin/notifications/${name}`
          );
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_RENDER_URL}/notifications/${name}`
          );
        }
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [name, role]); // Added name and role to the dependency array

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_RENDER_URL}/notifications/${notificationId}`
      );
      // Remove the deleted notification from the state
      setNotifications(
        notifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <Menu as="div" className="relative ml-3 my-auto">
      <div className="my-auto">
      <Menu.Button className="transition delay-100 relative flex rounded-full bg-gray-100 text-sm border-2 border-red-400 hover:border-red-500 hover:bg-red-500 focus:outline-none">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <NotificationsIcon
            sx={{ fontSize: 33 }}
            className="text-yellow-400 p-0.5 "
            aria-hidden="true"
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
        { role === "user" ? (
          <Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {notifications.length === 0 ? (
            <Menu.Item>
              <div className="px-4 py-2 text-sm text-gray-700">
                Notification is currently empty.
              </div>
            </Menu.Item>
          ) : (
            notifications.map((notification) => (
              <Menu.Item key={notification._id}>
                {({ active }) => (
                  <a
                    href={`/chats`}
                    className={classNames(
                      active ? "bg-gray-200" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => handleNotificationClick(notification._id)}
                  >
                    <div className="flex items-center gap-4 px-4 py-2">
                      <img
                        className="w-10 h-10 rounded-full "
                        src={require(`/public/images/${notification.profile}.jpeg`)}
                        alt=""
                      />
                      <div className="font-medium dark:text-white text-black">
                        <div>{notification.sender}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {notification.text}
                        </div>
                      </div>
                    </div>
                  </a>
                )}
              </Menu.Item>
            ))
          )}
        </Menu.Items>
        ): (
          <Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {notifications.length === 0 ? (
            <Menu.Item>
              <div className="px-4 py-2 text-sm text-gray-700">
                Notification is currently empty.
              </div>
            </Menu.Item>
          ) : (
            notifications.map((notification) => (
              <Menu.Item key={notification._id}>
                {({ active }) => (
                  <a
                    href={`/admin/${notification.sender}`}
                    className={classNames(
                      active ? "bg-gray-200" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => handleNotificationClick(notification._id)}
                  >
                    <div className="flex items-center gap-4 px-4 py-2">
                      <img
                        className="w-10 h-10 rounded-full "
                        src={require(`/public/images/${notification.profile}.jpeg`)}
                        alt=""
                      />
                      <div className="dark:text-white text-black">
                        <span className=" text-base">{notification.sender}&#8594;</span>
                        <span className=" text-base">{notification.receiver}</span>
                        <div className=" text-left text-sm text-gray-500 dark:text-gray-400">
                          {notification.text}
                        </div>
                      </div>
                    </div>
                  </a>
                )}
              </Menu.Item>
            ))
          )}
        </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
};

export default Notification;