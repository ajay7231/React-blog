import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn, setSignedIn, setUserData } from "../config/useSlice";
import "../styles/homepage.css";

const Homepage = () => {
  const dispatch = useDispatch();
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };

  const isSingnedIn = useSelector(selectSignedIn);

  return (
    <div className="home__page" style={{ display: isSingnedIn ? "none" : "" }}>
      {!isSingnedIn ? (
        <div className="login__message">
          <h2>📙</h2>
          <h1>A Reader's Spot</h1>

          <p>Happy Reading......</p>
          <GoogleLogin
            clientId={process.env.REACT_APP_API_KEY}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button animate"
              >
                SignIn with Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;
