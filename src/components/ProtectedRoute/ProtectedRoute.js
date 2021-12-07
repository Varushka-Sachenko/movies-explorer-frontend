import React from "react";
import { Route, Redirect } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
  //console.log(props)
  console.log(props.isCheckingToken)
  return (
    <Route>
      {() =>
        props.isCheckingToken ? <Preloader /> : props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
  );
};

export default ProtectedRoute; 