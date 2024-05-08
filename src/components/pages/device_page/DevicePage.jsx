import React, { useEffect, useState } from "react";
import "./device-page.css";
import { useParams } from "react-router-dom";
import { getBrands, getOneDevice } from "../../../http/files";

const DevicePage = () => {
  const [brands, setBrands] = useState([]);
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    getOneDevice(id).then((data) => setDevice(data));
    getBrands().then((data) => setBrands(data));
  }, [id]);

  function showDeviceName() {
    const brand = brands
      .filter((i) => i.id === device.brandId)
      .map((obj) => obj.name);
    return `${brand} ${device.name}`;
  }

  return (
    <div className="device-page">
      <div className="container">
        <div className="device-page__inner">
          <div className="device-page__body">
            <div className="device-page__col">
              <img src={process.env.REACT_APP_API_CLIENT + device.img} alt="" />
            </div>
            <div className="device-page__col">
              <div className="device-page__title">{showDeviceName()}</div>
              <div className="device-page__star">
                <span>{device.rating}</span>
              </div>
            </div>
            <div className="device-page__col">
              <div className="device-page__box">
                <div className="device-page__price">от {device.price} руб.</div>
                <button type="button" className="device-page__btn">
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
          <div className="device-page__row">
            <h2 className="device-page__row-title">Характеристики:</h2>
            <ul className="device-page__row-list">
              {device.info.map((i) => (
                <li key={i.id} className="device-page__row-item">
                  {i.title} : {i.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
