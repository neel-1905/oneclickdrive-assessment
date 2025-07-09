import { useFeedback } from "@/context/FeedbackContext";
import React from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";

const FeedbackMessage = () => {
  const { message, type } = useFeedback();

  console.log(message, type);

  if (!message || !type) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-[300px]">
      <Alert variant={type === "error" ? "destructive" : "default"}>
        {type === "error" ? (
          <AlertTriangle className="text-destructive" />
        ) : (
          <CheckCircle className="text-success" />
        )}
        <div>
          <AlertTitle>{message}</AlertTitle>
          {/* <AlertDescription>{message}</AlertDescription> */}
        </div>
      </Alert>
    </div>
  );
};

export default FeedbackMessage;
