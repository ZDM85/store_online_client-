import React, { useContext, useEffect } from "react";
import "./delete-role.css";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { deleteRole, fetchRoles } from "../../../../http/role";
import { getUsers } from "../../../../http/user";

const DeleteRole = () => {
  const { role } = useContext(Context);

  useEffect(() => {
    getUsers().then((data) => role.setUsers(data));
    fetchRoles().then((data) => role.setRoles(data));
  }, [role]);

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
  const handlerDeleteRole = () => {
    deleteRole(role.selectedUser.id, role.selectedRole.id).then((data) =>
      console.log(data)
    );
  };

  return (
    <div
      className="delete-role"
      onClick={() => role.setPopupDeleteRole("none")}
      style={{ display: role.popupDeleteRole }}
    >
      <div className="container">
        <div className="delete-role__inner">
          <div
            className="delete-role__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-role__header">
              <h2 className="delete-role__title">
                Удалить роль у пользователя
              </h2>
              <div
                className="delete-role__close"
                onClick={() => role.setPopupDeleteRole("none")}
              >
                X
              </div>
            </div>
            <form className="delete-role__form">
              <label
                htmlFor="delete-role__select"
                className="delete-role__label"
              >
                Выбирите пользователя
                <div className="delete-role__label-box">
                  <span onClick={handlerSelectUser}>
                    {role.selectedUser.email || "Список"}
                  </span>
                  <ul
                    style={{ display: role.showAddUser }}
                    className="delete-role__label-list"
                    name="select"
                    id="delete-role__select"
                  >
                    {role.users.map((user) => (
                      <li
                        key={user.id}
                        value=""
                        onClick={() => {
                          role.setSelectedUser(user);
                          role.setShowAddUser("none");
                        }}
                        className="delete-role__label-item"
                      >
                        {user.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
              <label
                htmlFor="delete-role__select"
                className="delete-role__label"
              >
                Выбирите роль
                <div className="delete-role__label-box">
                  <span onClick={handlerSelectRole}>
                    {role.selectedRole.name || "Список"}
                  </span>
                  <ul
                    style={{ display: role.showAddRole }}
                    className="delete-role__label-list"
                    name="select"
                    id="delete-role__select"
                  >
                    {role.roles.map((item) => (
                      <li
                        key={item.id}
                        value=""
                        onClick={() => {
                          role.setSelectedRole(item);
                          role.setShowAddRole("none");
                        }}
                        className="delete-role__label-item"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            </form>
            <button
              onClick={handlerDeleteRole}
              type="button"
              className="delete-role__btn"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DeleteRole);
