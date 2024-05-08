import React, { useEffect, useState } from "react";
import "./basket.css";
import { observer } from "mobx-react-lite";
import { getBrands } from "../../../http/files";
import { deleteDeviceBasket } from "../../../http/baskets";

const BasketItem = ({ device }) => {
  const brandId = device.brandId;
  const [brands, setBrands] = useState([]);
  const brandName = brands
    .map((brand) => (brand.id === brandId ? brand.name : null))
    .filter((i) => i);

  useEffect(() => {
    getBrands().then((data) => setBrands(data));
  }, []);

  function deleteHandler() {
    deleteDeviceBasket(device.id);
  }

  return (
    <div className="basket-item">
      <div className="container">
        <div className="basket-item__content">
          <img src={process.env.REACT_APP_API_CLIENT + device.img} alt="" />
          <div className="basket-item__title">
            {brandName + " " + device.name}
          </div>
          <div className="basket-item__price">{device.price}</div>
          <div className="basket-item__rating">{device.rating}</div>
          <button
            className="basket-item__delete"
            type="button"
            onClick={deleteHandler}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(BasketItem);
