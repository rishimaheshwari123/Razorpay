import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const referenceId = queryParams.get("reference");
  return (
    <div>
      <div>
        <p>Payment Successfully</p>
        <p>refrace id ${referenceId}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
