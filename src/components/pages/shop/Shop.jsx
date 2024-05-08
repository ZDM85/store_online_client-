import React, { useContext, useEffect } from "react";
import "./shop.css";
import { getBrands, getDevices, getTypes } from "../../../http/files";
import { Context } from "../../..";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { DEVICE_PAGE } from "../../../utils/consts";
import Pages from "../../Pages";
import { moveToBasket } from "../../../http/baskets";
import Rating from "../../../utils/widget/Widget";

const Shop = () => {
  const { device, basket } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));
    getDevices().then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device]);

  useEffect(() => {
    getDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device, device.page, device.selectedType, device.selectedBrand]);

  function showBrandName(brandId, typeId) {
    const brand = device.brands
      .map((brand) => (brand.id === brandId ? brand.name : null))
      .filter((brand) => brand);
    const type = device.types
      .map((type) => (type.id === typeId ? type.name : null))
      .filter((type) => type);
    return type + " " + brand;
  }

  async function handlerBasket(e, id) {
    e.stopPropagation();
    const data = await moveToBasket(id);
    basket.setSelectedBasket(data);
  }

  function handlerWidget(e) {
    e.stopPropagation();
    const rate = e.target.closest(".shop__devices-rate");
    const widget = rate.querySelector(".shop__devices-widget");
    if (widget.style.display === "none") {
      widget.style.display = "flex";
    } else {
      widget.style.display = "none";
    }
  }

  return (
    <div className="shop">
      <div className="container">
        <div className="shop__inner">
          <nav className="shop__nav">
            <ul className="shop__nav-list">
              {device.types.map((type) => (
                <li key={type.id} className="shop__nav-item">
                  <div
                    onClick={() => device.setSelectedType(type)}
                    className={
                      device.selectedType === type
                        ? "shop__nav-link--active"
                        : "shop__nav-link"
                    }
                  >
                    {type.name}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="shop__content">
            <ul className="shop__brands">
              {device.brands.map((brand) => (
                <li
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                  className="shop__brands-item"
                >
                  <div
                    className={
                      device.selectedBrand === brand
                        ? "shop__brands-link--active"
                        : "shop__brands-link"
                    }
                  >
                    {brand.name}
                  </div>
                </li>
              ))}
            </ul>
            <ul className="shop__devices">
              {device.devices.map((device) => (
                <li key={device.id} className="shop__devices-item">
                  <div
                    onClick={() => navigate(DEVICE_PAGE + "/" + device.id)}
                    className="shop__devices-link"
                  >
                    <div className="shop__image-box">
                      <img
                        src={process.env.REACT_APP_API_CLIENT + device.img}
                        alt=""
                      />
                    </div>
                    <div className="shop__devices-content">
                      <div className="shop__devices-brand">
                        <div className="shop__devices-title">
                          {showBrandName(device.brandId, device.typeId)}
                        </div>
                        <div className="shop__devices-rate">
                          {device.rating}
                          <span onClick={(e) => handlerWidget(e)}></span>
                          <div
                            style={{ display: "none" }}
                            className="shop__devices-widget"
                          >
                            <Rating rating={4} deviceId={device.id} />
                          </div>
                        </div>
                      </div>
                      <div className="shop__devices-name">{device.name}</div>
                      <button
                        className="shop__devices-basket"
                        onClick={(e) => handlerBasket(e, device.id)}
                      >
                        Добавить в корзину
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Pages />
        </div>
      </div>
    </div>
  );
};

export default observer(Shop);
