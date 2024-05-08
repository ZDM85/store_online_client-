import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN, BASKET, LOGIN, SHOP } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { getUsers, logout } from "../../http/user";
import { fetchRoles, fetchRolesUser } from "../../http/role";

const NavBar = () => {
  const { user, role } = useContext(Context);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  let isAdmin;
  const roleAdmin = role.roles
    .map((i) => (i.name === "ADMIN" ? i.id : null))
    .join("");
  if (typeof roleAdmin !== String) {
    isAdmin = roles.map((i) => i.roleId).includes(Number(roleAdmin));
  } else {
    isAdmin = roles.map((i) => i.roleId).includes(roleAdmin);
  }

  async function handlerLogout() {
    await logout();
    user.setUser({});
    user.setIsAuth(false);
    navigate(LOGIN);
  }

  useEffect(() => {
    if (user.isAuth === true) {
      fetchRoles().then((data) => role.setRoles(data));
      getUsers().then((data) => role.setUsers(data));
      fetchRolesUser().then((data) => setRoles(data));
    }
  }, [role, user.isAuth]);

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__inner">
          <div className="navbar__logo">
            <NavLink className="navlink" to={SHOP}>
              КупиДевайс
            </NavLink>
          </div>
          {user.isAuth ? (
            <div className="navbar__user">
              {isAdmin && (
                <div type="button" className="navbar__admin">
                  <NavLink className="navlink" to={ADMIN}>
                    Админ
                  </NavLink>
                </div>
              )}
              <NavLink className="navlink" to={BASKET}>
                <div className="navbar__basket"></div>
              </NavLink>
              <button
                onClick={() => handlerLogout()}
                type="button"
                className="navbar__exit"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="navbar__user">
              <div className="navbar__authorization">
                <NavLink className="navlink" to={LOGIN}>
                  Авторизация
                </NavLink>
              </div>
              <button
                onClick={() => logout()}
                type="button"
                className="navbar__exit"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(NavBar);
