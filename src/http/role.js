import { $authHost } from ".";

export const createRole = async (name) => {
  try {
    const { data } = await $authHost.post("api/role", name);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchRoles = async () => {
  try {
    const { data } = await $authHost.get(`api/role`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchRolesUser = async () => {
  try {
    const { data } = await $authHost.get(`api/role/role`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addRole = async (userId, roleId) => {
  try {
    const { data } = await $authHost.post(
      `api/role/add?userId=${userId}&roleId=${roleId}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteRole = async (userId, roleId) => {
  try {
    const { data } = await $authHost.delete(
      `api/role?userId=${userId}&roleId=${roleId}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
