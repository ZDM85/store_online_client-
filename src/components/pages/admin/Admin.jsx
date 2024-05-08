import React, { useContext } from "react";
import "./admin.css";
import { Context } from "../../..";
import CreateType from "../../modals/type/CreateType";
import { observer } from "mobx-react-lite";
import CreateBrand from "../../modals/brand/CreateBrand";
import CreateDevice from "../../modals/device/CreateDevice";
import DeleteType from "../../modals/delete/delete_type/DeleteType";
import DeleteBrand from "../../modals/delete/delete_brand/DeleteBrand";
import DeleteDevice from "../../modals/delete/delete_device/DeleteDevice";
import CreateRole from "../../modals/role/create-role/CreateRole";
import AddRole from "../../modals/role/add-role/AddRole";
import DeleteRole from "../../modals/role/delete-role/DeleteRole";

const Admin = () => {
  const { device, role, user } = useContext(Context);

  return (
    <div className="admin">
      <div className="container">
        <div className="admin__inner">
          <h2 className="admin__title">
            {user.user.isActivated === false
              ? "ПРОЙДИТЕ АКТИВАЦИЮ!!!"
              : "ПОЛЬЗОВАТЕЛЬ АКТИВИРОВАН"}
          </h2>
          <div className="admin__role">
            <div className="admin__col">
              <button
                onClick={() => role.setPopupCreateRole("flex")}
                type="button"
                className="admin__btn admin__btn--create"
              >
                Создать роль
              </button>
              <button
                onClick={() => role.setPopupAddRole("flex")}
                type="button"
                className="admin__btn admin__btn--add"
              >
                Добавить роль
              </button>
              <button
                onClick={() => role.setPopupDeleteRole("flex")}
                type="button"
                className="admin__btn admin__btn-remove"
              >
                Удалить роль
              </button>
              <CreateRole />
              <AddRole />
              <DeleteRole />
            </div>
          </div>
          <div className="admin__body">
            <div className="admin__col">
              <button
                onClick={() => device.setPopupType("flex")}
                type="button"
                className="admin__btn"
              >
                Добавить новый тип
              </button>
              <button
                onClick={() => device.setPopupDeleteType("flex")}
                type="button"
                className="admin__btn admin__btn-remove"
              >
                Удалить тип
              </button>
            </div>
            <div className="admin__col">
              <button
                onClick={() => device.setPopupBrand("flex")}
                type="button"
                className="admin__btn"
              >
                Добавить новый бренд
              </button>
              <button
                onClick={() => device.setPopupDeleteBrand("flex")}
                type="button"
                className="admin__btn admin__btn-remove"
              >
                Удалить бренд
              </button>
            </div>
            <div className="admin__col">
              <button
                onClick={() => device.setPopupDevice("flex")}
                type="button"
                className="admin__btn"
              >
                Добавить новый девайс
              </button>
              <button
                onClick={() => device.setPopupDeleteDevice("flex")}
                type="button"
                className="admin__btn admin__btn-remove"
              >
                Удалить устройство
              </button>
            </div>
          </div>
          <CreateType />
          <CreateBrand />
          <CreateDevice />
          <DeleteType />
          <DeleteBrand />
          <DeleteDevice />
        </div>
      </div>
    </div>
  );
};

export default observer(Admin);
