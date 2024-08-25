import { createContext, useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export const ToastifyContext = createContext();

const ToastifyProvider = ({ children }) => {
  const [toastContent, setToastContent] = useState({
    content: null,
    // 'info', 'success', 'warning' or 'error'
    type: null,
    duration: 1000,
  });

  const initialState = { toastContent, setToastContent };

  useEffect(() => {
    if (toastContent.content) {
      switch (toastContent.type) {
        case "info":
          toast.info(toastContent.content);
          break;
        case "success":
          toast.success(toastContent.content);
          break;
        case "warning":
          toast.warning(toastContent.content);
          break;
        default:
          toast.error(toastContent.content);
          break;
      }

      setToastContent({
        content: null,
        type: null,
        duration: 1000,
      });
    }
  }, [toastContent.content]);

  return (
    <ToastifyContext.Provider value={initialState}>
      {children}
      <ToastContainer
        autoClose={toastContent.duration}
        pauseOnHover={true}
        theme="light"
        transition={Bounce}
      />
    </ToastifyContext.Provider>
  );
};

export default ToastifyProvider;
