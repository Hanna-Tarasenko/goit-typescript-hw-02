import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
