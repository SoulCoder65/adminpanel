import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accessspecificrole } from "../../actions/auth";
const PrivateRoute = ({ component: Component, ...remaining }) => {
  const dispatch = useDispatch();

  return (
    <Route
      {...remaining}
      component={(props) => {
        //Direct user to home page if user login else redirect to sign in
        const token = window.localStorage.getItem("token");
        if (token) {
          if (props.location.pathname == "/") {
            try {
              dispatch(
                accessspecificrole(null, JSON.parse(token).role.toString())
              ).then((res) => {
                if (res.status == 200) {
                  return <Component {...props} />;
                } else {
                  return <Redirect to={"/signin"} />;
                }
              });
              return <Component {...props} />;
            } catch (e) {
              return <Redirect to={"/signin"} />;
            }
          } else if (props.location.pathname == "/accesspanel") {
            if (JSON.parse(token).isSuperAdmin) {
              return <Component {...props} />;
            }
            else{
              return <Redirect to={"/"}/>;
            }
          } else {
            return <Component {...props} />;
          }
        } else {
          return <Redirect to={"/signin"} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
