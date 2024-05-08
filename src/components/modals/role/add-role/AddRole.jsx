import React, { useContext, useEffect } from "react";
import "./add-role.css";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { addRole, fetchRoles } from "../../../../http/role";
import { getUsers } from "../../../../http/user";

const AddRole = () => {
  const { role } = useContext(Context);

  useEffect(() => {
    getUsers().then((data) => role.setUsers(data));
    fetchRoles().then((data) => role.setRoles(data));
  }, [role]);

  const handlerAddRole = () => {
    addRole(role.selectedUser.id, role.selectedRole.id).then((data) =>
      console.log(data)
    );
  };

  const handlerSelectUser = () => {
    if (role.showAddUser === "block") {
      role.setShowAddUser("none");
    } else {
      role.setShowAddUser("block");
    }
  };

  const handlerSelectRole = () => {
    if (role.showAddRole === "block") {
      role.setShowAddRole("none");
    } else {
      role.setShowAddRole("block");
    }
  };

  return (
    <div
      className="add-role"
      onClick={() => role.setPopupAddRole("none")}
      style={{ display: role.popupAddRole }}
    >
      <div className="container">
        <div className="add-role__inner">
          <div
            className="add-role__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-role__header">
              <h2 className="add-role__title">Добавить роль пользователю</h2>
              <div
                className="add-role__close"
                onClick={() => role.setPopupAddRole("none")}
              >
                X
              </div>
            </div>
            <form className="add-role__form">
              <label htmlFor="add-role__select" className="add-role__label">
                Выбирите пользователя
                <div className="add-role__label-box">
                  <span onClick={handlerSelectUser}>
                    {role.selectedUser.email || "Список"}
                  </span>
                  <ul
                    style={{ display: role.showAddUser }}
                    className="add-role__label-list"
                    name="select"
                    id="add-role__select"
                  >
                    {role.users.map((user) => (
                      <li
                        key={user.id}
                        value=""
                        onClick={() => {
                          role.setSelectedUser(user);
                          role.setShowAddUser("none");
                        }}
                        className="add-role__label-item"
                      >
                        {user.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
              <label htmlFor="add-role__select" className="add-role__label">
                Выбирите роль
                <div className="add-role__label-box">
                  <span onClick={handlerSelectRole}>
                    {role.selectedRole.name || "Список"}
                  </span>
                  <ul
                    style={{ display: role.showAddRole }}
                    className="add-role__label-list"
                    name="select"
                    id="add-role__select"
                  >
                    {role.roles.map((item) => (
                      <li
                        key={item.id}
                        value=""
                        onClick={() => {
                          role.setSelectedRole(item);
                          role.setShowAddRole("none");
                        }}
                        className="add-role__label-item"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            </form>
            <button
              onClick={handlerAddRole}
              type="button"
              className="add-role__btn"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(AddRole);
