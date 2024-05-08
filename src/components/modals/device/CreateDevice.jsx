import React, { useContext, useEffect, useState } from "react";
import "./create-device.css";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import Input from "../../../utils/input/Input";
import {
  createDevice,
  getBrands,
  getDevices,
  getTypes,
} from "../../../http/files";

const CreateDevice = () => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));
    getDevices().then((data) => device.setDevices(data.rows));
  }, [device]);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("img", file);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => device.setPopupDevice("none"));
  };

  function handlerSelectBrand() {
    if (device.showBrand === "block") {
      device.setShowBrand("none");
    } else {
      device.setShowBrand("block");
    }
  }
  function handlerSelectType() {
    if (device.showType === "block") {
      device.setShowType("none");
    } else {
      device.setShowType("block");
    }
  }

  return (
    <div
      className="create-device"
      onClick={() => device.setPopupDevice("none")}
      style={{ display: device.popupDevice }}
    >
      <div className="container">
        <div className="create-device__inner">
          <div
            className="create-device__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="create-device__header">
              <h2 className="create-device__title">Создать новое устройство</h2>
              <div
                className="create-device__close"
                onClick={() => device.setPopupDevice("none")}
              >
                X
              </div>
            </div>
            <form className="create-device__form">
              <label
                htmlFor="create-device__select"
                className="create-device__label"
              >
                Выбирите тип
                <div className="create-device__label-box">
                  <span onClick={handlerSelectType}>
                    {device.selectedType.name || "Список"}
                  </span>
                  <ul
                    style={{ display: device.showType }}
                    className="create-device__label-list"
                    name="select"
                    id="create-device__select"
                  >
                    {device.types.map((type) => (
                      <li
                        key={type.id}
                        value=""
                        onClick={() => {
                          device.setSelectedType(type);
                          device.setShowType("none");
                        }}
                        className="create-device__label-item"
                      >
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
              <label className="create-device__label">
                Выбирите бренд
                <div className="create-device__label-box">
                  <span onClick={handlerSelectBrand}>
                    {device.selectedBrand.name || "Список"}
                  </span>
                  <ul
                    style={{ display: device.showBrand }}
                    className="create-device__label-list"
                    name="select"
                    id="create-device__select"
                  >
                    {device.brands.map((brand) => (
                      <li
                        onClick={() => {
                          device.setSelectedBrand(brand);
                          device.setShowBrand("none");
                        }}
                        key={brand.id}
                        value=""
                        className="create-device__label-item"
                      >
                        {brand.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
              <Input
                value={name}
                setValue={setName}
                type="text"
                placeholder="Введите название..."
              />
              <Input
                value={price}
                setValue={setPrice}
                type="number"
                placeholder="Введите стоимость..."
              />
              <input
                style={{ border: "none", paddingLeft: 0 }}
                onChange={(e) => selectFile(e)}
                type="file"
              />
              <hr />
              <button
                onClick={addInfo}
                type="button"
                className="create-device__info-btn"
              >
                Добавить новое свойство
              </button>
              <ul className="create-device__info-list">
                {info.map((i) => (
                  <li key={i.number} className="create-device__info-item">
                    <input
                      value={i.title}
                      onChange={(e) =>
                        changeInfo("title", e.target.value, i.number)
                      }
                      type="text"
                      placeholder="Введите название свойства..."
                    />
                    <input
                      value={i.description}
                      onChange={(e) =>
                        changeInfo("description", e.target.value, i.number)
                      }
                      type="text"
                      placeholder="Введите описание свойства..."
                    />
                    <button
                      onClick={() => removeInfo(i.number)}
                      type="button"
                      className="create-device__info-delete"
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            </form>
            <button
              onClick={addDevice}
              type="button"
              className="create-device__btn"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CreateDevice);
