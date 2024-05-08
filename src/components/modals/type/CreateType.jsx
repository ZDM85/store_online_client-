import React, { useContext, useState } from "react";
import "./create-type.css";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import Input from "../../../utils/input/Input";
import { createType } from "../../../http/files";

const CreateType = () => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");

  const addType = () => {
    createType({ name: name }).then((data) => setName(""));
  };

  return (
    <div
      className="create-type"
      onClick={() => device.setPopupType("none")}
      style={{ display: device.popupType }}
    >
      <div className="container">
        <div className="create-type__inner">
          <div
            className="create-type__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="create-type__header">
              <h2 className="create-type__title">Создать новый тип</h2>
              <div
                className="create-type__close"
                onClick={() => device.setPopupType("none")}
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
              onClick={addType}
              type="button"
              className="create-type__btn"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CreateType);
