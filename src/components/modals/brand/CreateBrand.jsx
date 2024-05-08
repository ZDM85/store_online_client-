import React, { useContext, useState } from "react";
import "./create-brand.css";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import Input from "../../../utils/input/Input";
import { createBrand } from "../../../http/files";

const CreateBrand = () => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");

  const addBrand = () => {
    createBrand({ name: name }).then((data) => setName(""));
  };

  return (
    <div
      className="create-brand"
      onClick={() => device.setPopupBrand("none")}
      style={{ display: device.popupBrand }}
    >
      <div className="container">
        <div className="create-brand__inner">
          <div
            className="create-brand__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="create-brand__header">
              <h2 className="create-brand__title">Создать новый бренд</h2>
              <div
                className="create-brand__close"
                onClick={() => device.setPopupBrand("none")}
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
              onClick={() => addBrand(name)}
              type="button"
              className="create-brand__btn"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CreateBrand);
