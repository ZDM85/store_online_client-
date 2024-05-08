import { $authHost } from ".";

export const getBasket = async () => {
  try {
    const { data } = await $authHost.get("api/basket");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const moveToBasket = async (deviceId) => {
  try {
    const { data } = await $authHost.post(`api/basket?deviceId=${deviceId}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteDeviceBasket = async (deviceId) => {
  try {
    const { data } = await $authHost.delete(`api/basket?id=${deviceId}`);
    return alert(data.message);
  } catch (e) {
    console.log(e);
  }
};
