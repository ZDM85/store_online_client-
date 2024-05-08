import React, { useContext, useEffect } from "react";
import "./app.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import NavBar from "./navbar/NavBar";
import { Context } from "..";
import { check } from "../http/user";
import { observer } from "mobx-react-lite";

const App = () => {
  const { user } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => user.setLoading(false));
    }
  }, [user]);

  if (user.loading) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default observer(App);
