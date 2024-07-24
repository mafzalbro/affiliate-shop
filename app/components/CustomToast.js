import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notifySuccess(message) {
  toast.success(message, {
    className: 'bg-green-500 text-white p-2 rounded',
    bodyClassName: 'flex items-center',
  });
}

export function notifyError(message) {
  toast.error(message, {
    className: 'bg-red-500 text-white p-2 rounded',
    bodyClassName: 'flex items-center',
  });
}

const CustomToast = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default CustomToast;
