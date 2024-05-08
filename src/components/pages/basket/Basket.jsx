import React, { useContext, useEffect, useState } from "react";
import "./basket.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import { getBasket } from "../../../http/baskets";
import BasketItem from "./BasketItem";
import { getDevices } from "../../../http/files";

const Basket = () => {
  const { basket } = useContext(Context);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getBasket().then((data) => basket.setInfo(data));
    getDevices().then((data) => setDevices(data.rows));
  }, [basket]);

  let device;
  const basketId = basket.info.map((i) => i.deviceId);

  if (basketId.length < 1) {
    device = devices.filter((device) => device.id === basketId);
  }
  if (basketId.length >= 1) {
    let item = [];
    for (let i = 0; i < basketId.length; i++) {
      devices.map((device) =>
        device.id === basketId[i] ? item.push(device) : null
      );
    }
    device = item;
  }

  return (
    <div className="basket">
      <div className="container">
        <h1 className="basket__header">Корзина</h1>
        <div className="basket__content">
          <div className="basket__img">Изображение</div>
          <div className="basket__title">Название утсройства</div>
          <div className="basket__price">Стоимость</div>
          <div className="basket__rating">Рейтинг</div>
        </div>
        {device.map((device) => (
          <BasketItem key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default observer(Basket);
