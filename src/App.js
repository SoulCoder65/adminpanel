import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//private route
import PrivateRoute from "./Components/Security/PrivateRoute";
// Components
import Home from "./Components/DashBoard/Home";
import Business from "./Components/Business/index";
import Users from "./Components/Users/index";
import AdminPanel from "./Components/adminpanel/index";
import SignIn from "./Components/Authentication/signinpage";
import FillEmail from "./Components/Authentication/forgetpassword/fillemail";
import ChangePasswordPage from "./Components/Authentication/forgetpassword/changepassword";
import AccessPanel from "./Components/accesspanel/index";

import { useDispatch, useSelector } from "react-redux";

import { isUserLogin } from "./actions/auth";
import { HashRouter } from "react-router-dom";

const App = () => {
  // check if user already login if true direct to home
  let auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }
    // dispatch(getInitialData());
  }, []);

  return (
    <>
      <HashRouter basename="/">
        <Switch>
          <PrivateRoute path="/" exact component={Home} />

          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/verifyEmail" exact>
            <FillEmail />
          </Route>
          <PrivateRoute path="/business" exact component={Business} />

          <PrivateRoute path="/users" exact component={Users} />
          <PrivateRoute path="/queries" exact component={AdminPanel} />
          <PrivateRoute path="/accesspanel" exact component={AccessPanel} />
          <Route
            path="/changepassword"
            render={(props) => <ChangePasswordPage {...props} />}
          />
          {/* <Route path="*" component={SignIn}  /> */}
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />

          {/* <PrivateRoute path="/page" exact component={Page} /> */}

          {/* <Route path="/signup" exact>
          <Signup />
        </Route> */}
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
