import { $authHost, $host } from ".";

export const getTypes = async () => {
  try {
    const { data } = await $host.get("api/type");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createType = async (name) => {
  try {
    const { data } = await $authHost.post("api/type", name);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteType = async (typeId) => {
  try {
    const { data } = await $authHost.delete(`api/type?id=${typeId}`);
    return alert(data.message);
  } catch (e) {
    console.log(e);
  }
};

export const getBrands = async () => {
  try {
    const { data } = await $host.get("api/brand");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createBrand = async (name) => {
  try {
    const { data } = await $authHost.post("api/brand", name);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteBrand = async (brandId) => {
  try {
    const { data } = await $authHost.delete(`api/brand?id=${brandId}`);
    return alert(data.message);
  } catch (e) {
    console.log(e);
  }
};

export const getDevices = async (typeId, brandId, page, limit) => {
  try {
    const { data } = await $host.get("api/device", {
      params: {
        typeId,
        brandId,
        page,
        limit,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getOneDevice = async (id) => {
  try {
    const { data } = await $host.get(`api/device/` + id);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createDevice = async (device) => {
  try {
    const { data } = await $authHost.post("api/device", device);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    const { data } = await $authHost.delete(`api/device?id=${deviceId}`);
    return alert(data.message);
  } catch (e) {
    console.log(e);
  }
};
