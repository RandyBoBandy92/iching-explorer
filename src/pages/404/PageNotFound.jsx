import React from "react";
import { APP_NAME } from "../../utilities/constants";
import { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    document.title = `${APP_NAME} | 404`;
  }, []);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default PageNotFound;
