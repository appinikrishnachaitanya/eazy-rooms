import React from "react";

const Error = (props) => {
  return (
    <div>
      <div class="alert alert-danger m-3" role="alert">
        {props.message}
      </div>
    </div>
  );
};

Error.defaultProps = {
  message: "Something went wrong... please try again !!",
};
export default Error;
