import React, { useContext } from "react";
import "./delete-brand.css";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { deleteBrand } from "../../../../http/files";

const DeleteBrand = () => {
  const { device } = useContext(Context);

  function handlerSelectBrand(e) {
    e.stopPropagation();
    if (device.showType === "block") {
      device.setShowBrand("none");
    } else {
      device.setShowBrand("block");
    }
  }

  function deleteHandlerBrand() {
    deleteBrand(device.selectedBrand.id);
    device.setPopupDeleteBrand("none");
  }

  return (
    <div
      className="delete-brand"
      onClick={() => device.setPopupDeleteBrand("none")}
      style={{ display: device.popupDeleteBrand }}
    >
      <div className="container">
        <div className="delete-brand__inner">
          <div
            className="delete-brand__content"
            onClick={(e) => {
              e.stopPropagation();
              device.setShowBrand("none");
            }}
          >
            <div className="delete-brand__header">
              <h2 className="delete-brand__title">Удалить бренд</h2>
              <div
                className="delete-brand__close"
                onClick={() => device.setPopupDeleteBrand("none")}
              >
                X
              </div>
            </div>
            <label
              htmlFor="delete-brand__select"
              className="delete-brand__label"
            >
              Выбирите бренд
              <div className="delete-brand__label-box">
                <span onClick={(e) => handlerSelectBrand(e)}>
                  {device.selectedBrand.name || "Список"}
                </span>
                <ul
                  style={{ display: device.showBrand }}
                  className="delete-brand__label-list"
                  name="select"
                  id="delete-brand__select"
                >
                  {device.brands.map((brand) => (
                    <li
                      key={brand.id}
                      value=""
                      onClick={() => {
                        device.setSelectedBrand(brand);
                        device.setShowBrand("none");
                      }}
                      className="delete-brand__label-item"
                    >
                      {brand.name}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
            <button
              onClick={deleteHandlerBrand}
              type="button"
              className="delete-brand__btn"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DeleteBrand);
