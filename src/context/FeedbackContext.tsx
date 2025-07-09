import { createContext, ReactNode, useContext, useState } from "react";

type FeedbackType = "success" | "error" | null;

type FeedbackContextType = {
  message: string;
  type: FeedbackType;
  show: (type: FeedbackType, message: string, delay?: number) => void;
  clear: () => void;
};

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export const FeedbackContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<FeedbackType | null>(null);

  const clear = () => {
    setMessage("");
    setType(null);
  };

  const show = (type: FeedbackType, message: string, delay: number = 4) => {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      clear();
    }, delay * 1000);
  };

  return (
    <FeedbackContext.Provider
      value={{
        message,
        type,
        show,
        clear,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context)
    throw new Error(
      "useContext can only be used inside a FeedbackContextProvider"
    );
  return context;
};
