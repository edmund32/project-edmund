import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showNotification = (message, type = "success") => {
    // Show
    setNotification({ message, type, visible: true });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 2700);

    // Delete
    setTimeout(() => {
      setNotification({ message: "", type: "", visible: false });
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Komponen notifikasi */}
      {notification.message && (
        <div
          className={`fixed top-0 left-0 right-0 
            px-5 py-2 shadow-md text-white text-sm 
            font-medium text-center transition-all duration-300 z-[9999]
            ${
              notification.type === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }
            ${
              notification.visible
                ? "animate-fade-in"
                : "animate-fade-out"
            }
          `}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
