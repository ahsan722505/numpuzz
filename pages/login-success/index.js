import { useEffect } from "react";
export default () => {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const params = new URLSearchParams(window.location.search);
    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage({
        source: "login-redirect",
        token: params.get("token"),
      });
      // close the popup
      window.close();
    }
  });
  // some text to show the user
  return <p>Please wait...</p>;
};
