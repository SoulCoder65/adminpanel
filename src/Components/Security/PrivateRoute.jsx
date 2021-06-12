import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const PrivateRoute = ({ component: Component, ...remaining }) => {
  const dispatch = useDispatch();

  return (
    <Route
      {...remaining}
      component={(props) => {
        try {
          // Direct user to home page if user login else redirect to sign in
          const token = window.localStorage.getItem("token");
          // return <Component {...props} />;
          if (token) {
            if (props.location.pathname === "/") {
              try {
                return <Component {...props} />;
              } catch (e) {
                dispatch(logout());

                return <Redirect to={"/signin"} />;
              }
            } else if (props.location.pathname === "/accesspanel") {
              if (JSON.parse(token).isSuperAdmin) {
                return <Component {...props} />;
              } else {
                return <Redirect to={"/"} />;
              }
            } else {
              return <Component {...props} />;
            }
          } else {
            dispatch(logout());

            return <Redirect to={"/signin"} />;
          }
        } catch (e) {
          return <Redirect to={"/signin"} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
