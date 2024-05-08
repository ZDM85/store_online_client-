import React, { useContext } from "react";
import "./delete-type.css";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { deleteType } from "../../../../http/files";

const DeleteType = () => {
  const { device } = useContext(Context);

  function handlerSelectType(e) {
    e.stopPropagation();
    if (device.showType === "block") {
      device.setShowType("none");
    } else {
      device.setShowType("block");
    }
  }

  function deleteHandlerType() {
    deleteType(device.selectedType.id);
    device.setPopupDeleteType("none");
  }

  return (
    <div
      className="delete-type"
      onClick={() => device.setPopupDeleteType("none")}
      style={{ display: device.popupDeleteType }}
    >
      <div className="container">
        <div className="delete-type__inner">
          <div
            className="delete-type__content"
            onClick={(e) => {
              e.stopPropagation();
              device.setShowType("none");
            }}
          >
            <div className="delete-type__header">
              <h2 className="delete-type__title">Удалить тип</h2>
              <div
                className="delete-type__close"
                onClick={() => device.setPopupDeleteType("none")}
              >
                X
              </div>
            </div>
            <label htmlFor="delete-type__select" className="delete-type__label">
              Выбирите тип
              <div className="delete-type__label-box">
                <span onClick={(e) => handlerSelectType(e)}>
                  {device.selectedType.name || "Список"}
                </span>
                <ul
                  style={{ display: device.showType }}
                  className="delete-type__label-list"
                  name="select"
                  id="delete-type__select"
                >
                  {device.types.map((type) => (
                    <li
                      key={type.id}
                      value=""
                      onClick={() => {
                        device.setSelectedType(type);
                        device.setShowType("none");
                      }}
                      className="delete-type__label-item"
                    >
                      {type.name}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
            <button
              onClick={deleteHandlerType}
              type="button"
              className="delete-type__btn"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DeleteType);
