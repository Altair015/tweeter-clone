import axios from "axios";
import { useToastify } from "../hooks";

export default function useAxios() {
  const { setToastContent } = useToastify();

  const throwError = (message) =>
    setToastContent({
      content: message,
      type: "error",
    });

  const handle401 = (error) => {
    if (error.response.status != 401) return;

    throwError(error.response.data.message);

    // cookie is not availble, remove the token from localstorage, now re-login
    localStorage.removeItem("auth");
    // to unmount the providers,and reset react-dom so that it should point to login
    setTimeout(() => {
      window.location.reload();
    }, [2000]);
  };

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_IDENTIFIER,
    withCredentials: true, // so that the cookie goes with every request
  });

  // Just to track request bug
  // apiClient.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response) {
  //       // Server responded with a status code outside of 2xx range
  //       console.error("Response error:", error.response);
  //       if (error.response.status === 401) {
  //         // Handle 401 Unauthorized error
  //         console.error("Unauthorized error:", error.response.data);
  //         // Example: Redirect to login page or show an alert
  //         // history.push('/login');
  //         // alert('Unauthorized access. Please login.');
  //       }
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error("Request error:", error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an error
  //       console.error("Request setup error:", error.message);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  /**
   * Perform a GET request.
   * @param {string} url - The endpoint URL.
   * @param {object} [config] - Optional Axios configuration.
   * @returns {Promise} A Promise that resolves to the response data.
   * @throws {Error} If an error occurs during the request.
   */
  const get = async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response;
    } catch (error) {
      handle401(error);
      return error.response;
    }
  };

  /**
   * Perform a POST request.
   * @param {string} url - The endpoint URL.
   * @param {object} [data] - Data to be sent as the request body.
   * @param {object} [config] - Optional Axios configuration.
   * @returns {Promise} A Promise that resolves to the response data.
   * @throws {Error} If an error occurs during the request.
   */
  const post = async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response;
    } catch (error) {
      console.log(error);
      handle401(error);
      return error.response;
    }
  };

  /**
   * Perform a PUT request.
   * @param {string} url - The endpoint URL.
   * @param {object} [data] - Data to be sent as the request body.
   * @param {object} [config] - Optional Axios configuration.
   * @returns {Promise} A Promise that resolves to the response data.
   * @throws {Error} If an error occurs during the request.
   */
  const put = async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response;
    } catch (error) {
      console.log(error);
      handle401(error);
      return error.response;
    }
  };

  /**
   * Perform a DELETE request.
   * @param {string} url - The endpoint URL.
   * @param {object} [config] - Optional Axios configuration.
   * @returns {Promise} A Promise that resolves to the response data.
   * @throws {Error} If an error occurs during the request.
   */
  const deleteRequest = async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response;
    } catch (error) {
      console.log(error);
      handle401(error);
      return error.response;
    }
  };

  return { get, post, put, deleteRequest };
}
