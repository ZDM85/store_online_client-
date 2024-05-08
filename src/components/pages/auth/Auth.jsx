import React, { useContext, useState } from "react";
import "./auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../utils/input/Input";
import { LOGIN, REGISTRATION, SHOP } from "../../../utils/consts";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { login, registration } from "../../../http/user";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();

  async function clickHandler() {
    try {
      let name;
      if (isLogin) {
        name = await login(email, password);
      } else {
        name = await registration(email, password);
      }
      if (!name) {
        setEmail("");
        setPassword("");
        alert("Пользователь не найден!");
      }
      user.setUser(name.user);
      user.setIsAuth(true);
      navigate(SHOP);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="authorization" onClick={() => navigate(SHOP)}>
      <div
        className="authorization__inner"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="authorization__title">
          {isLogin ? "Авторизация" : "Регистрация"}
        </h2>
        <Input
          value={email}
          setValue={setEmail}
          type="text"
          placeholder="Введите ваш email..."
        />
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Введите ваш password..."
        />
        <div className="authorization__nav">
          {isLogin ? (
            <nav className="authorization__nav-box">
              Нет аккаунта?
              <a
                href={REGISTRATION}
                className="authorization__nav-registration"
              >
                Регистрация
              </a>
            </nav>
          ) : (
            <nav className="authorization__nav-box">
              Есть аккаунт!
              <a href={LOGIN} className="authorization__nav-registration">
                Авторизация
              </a>
            </nav>
          )}
          <button
            onClick={clickHandler}
            type="button"
            className="authorization__btn"
          >
            {isLogin ? "Войти" : "Регистрация"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Auth);
