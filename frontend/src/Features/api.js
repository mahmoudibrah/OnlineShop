export const url = "http://localhost:5000/api";

export const setHeadersAdmin = () => {
  const config = {
    headers: {
        "x-auth-token" : localStorage.getItem('token')
    },
  };
  return config
};
