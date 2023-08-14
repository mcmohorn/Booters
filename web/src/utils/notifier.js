import { toast } from "react-toastify";

const defaultToastOptions = {
  hideProgressBar: true,
};

const showError = (msg) => {
  toast.error(msg, defaultToastOptions);
};

const showSuccess = (msg) => {
  toast.success(msg, defaultToastOptions);
};

export { showError, showSuccess };
