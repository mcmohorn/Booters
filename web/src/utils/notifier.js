import { toast } from "react-toastify";

const defaultToastOptions = {
  hideProgressBar: true,
};

const showError = (msg) => {
  toast.error(msg, defaultToastOptions);
};

export { showError };
