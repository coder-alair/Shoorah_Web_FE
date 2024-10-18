import React, { useEffect } from "react";
import { Api } from "../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useSubscriptionRedirection = () => {
  const history = useHistory();

  useEffect(() => {
    Api.getCurrentPlan().then((res) => {
      if (res.data.meta.code == 1) {
        if (res?.data?.data?.accountType != "SUBSCRIBED") {
          // history.push("/subscription");
        }
      }
    });
  }, []);

  return <></>;
};

export default useSubscriptionRedirection;
