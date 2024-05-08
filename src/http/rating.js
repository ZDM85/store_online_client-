import { $authHost } from ".";

export const setRate = async (rate, deviceId) => {
  try {
    const { data } = await $authHost.post(
      `api/rate?rate=${rate}&deviceId=${deviceId}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
