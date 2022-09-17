export const getToken = () => {
  return window.localStorage.getItem("kwanso_Test");
};

export const setToken = (token: string) => {
  return window.localStorage.setItem("kwanso_Test", token);
};

export const removeToken = () => {
  return window.localStorage.removeItem("kwanso_Test");
};
