import React from "react";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
      className="m-3"
    >
      <HashLoader
        color="green"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
