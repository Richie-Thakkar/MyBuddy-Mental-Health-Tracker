import { useState, useEffect } from "react";
const SessionManager = () => {
const [sessionId, setSessionId] = useState(null);
const [sessionStatus, setSessionStatus] = useState(null);
  
  const storeSessionId = (id) => {
    setSessionId(id);
  };

  useEffect(() => {
    if (sessionId) {
      console.log(sessionId);
      checkSessionStatus();
    }
    const checkSessionStatus = async () => {
      try {
        console.log(sessionId);
        const response = await fetch("/sessionCheck", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"testid": sessionId }),
        });

        const data = await response.json();
        setSessionStatus(data.status);

        if (data.status === "session check failed") {
          console.log("Session Check Failed");
        }
      } 
      catch (error) {
        console.error(error);
      }
    };

    
  }, [sessionId]);

  

  return {
    sessionId,
    sessionStatus,
    storeSessionId,
    setSessionId,
    setSessionStatus, 
  };
};

export default SessionManager;
