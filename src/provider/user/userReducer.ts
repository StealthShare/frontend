export const userReducer = (state: any, action: any) => {
  if (action.type === "LOGIN") {
    return { ...state, isLoggedIn: true, address: action.payload };
  }

  if (action.type === "LOGOUT") {
    return { ...state, isLoggedIn: false, address: "" };
  }

  return {
    isLoggedIn: false,
    address: "",
    login: () => {},
    logout: () => {}
  };
};
