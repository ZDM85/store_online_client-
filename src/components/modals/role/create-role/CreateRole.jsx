import React, { useContext, useState } from "react";
import "./create-role.css";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import Input from "../../../../utils/input/Input";
import { createRole } from "../../../../http/role";

const CreateRole = () => {
  const { role } = useContext(Context);
  const [name, setName] = useState("");

  const handlerCreateRole = () => {
    createRole({ name: name }).then((data) => {
      console.log(data);
      setName("");
    });
  };

  return (
    <div
      className="create-role"
      onClick={() => role.setPopupCreateRole("none")}
      style={{ display: role.popupCreateRole }}
    >
      <div className="container">
        <div className="create-role__inner">
          <div
            className="create-role__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="create-role__header">
              <h2 className="create-role__title">Создать новую роль</h2>
              <div
                className="create-role__close"
                onClick={() => role.setPopupCreateRole("none")}
              >
                X
              </div>
            </div>
            <Input
              value={name}
              setValue={setName}
              type="text"
              placeholder="Введите название..."
            />
            <button
              onClick={handlerCreateRole}
              type="button"
              className="create-role__btn"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CreateRole);
