import React, { useContext } from "react";
import "./delete-device.css";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import { deleteDevice } from "../../../../http/files";

const DeleteDevice = () => {
  const { device } = useContext(Context);

  function handlerSelectDevice(e) {
    e.stopPropagation();
    if (device.showDevice === "block") {
      device.setShowDevice("none");
    } else {
      device.setShowDevice("block");
    }
  }

  function deleteHandlerDevice() {
    deleteDevice(device.selectedDevice.id);
    device.setPopupDeleteDevice("none");
  }

  function handlerListSelect(obj) {
    device.setSelectedDevice(obj);
    device.setShowDevice("none");
  }

  return (
    <div
      className="delete-device"
      onClick={() => device.setPopupDeleteDevice("none")}
      style={{ display: device.popupDeleteDevice }}
    >
      <div className="container">
        <div className="delete-device__inner">
          <div
            className="delete-device__content"
            onClick={(e) => {
              e.stopPropagation();
              device.setShowDevice("none");
            }}
          >
            <div className="delete-device__header">
              <h2 className="delete-device__title">Удалить устройство</h2>
              <div
                className="delete-device__close"
                onClick={() => device.setPopupDeleteDevice("none")}
              >
                X
              </div>
            </div>
            <label
              htmlFor="delete-device__select"
              className="delete-device__label"
            >
              Выбирите устройство
              <div className="delete-device__label-box">
                <span onClick={(e) => handlerSelectDevice(e)}>
                  {device.selectedDevice.name || "Список"}
                </span>
                <ul
                  style={{ display: device.showDevice }}
                  className="delete-device__label-list"
                  name="select"
                  id="delete-device__select"
                >
                  {device.devices.map((device) => (
                    <li
                      key={device.id}
                      value=""
                      onClick={() => handlerListSelect(device)}
                      className="delete-device__label-item"
                    >
                      {device.name}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
            <button
              onClick={deleteHandlerDevice}
              type="button"
              className="delete-device__btn"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DeleteDevice);
