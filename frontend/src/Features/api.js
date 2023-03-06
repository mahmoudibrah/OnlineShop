export const url = "https://dukanstore.netlify.app/api";

export const setHeadersAdmin = () => {
  const config = {
    headers: {
        "x-auth-token" : localStorage.getItem('token')
    },
  };
  return config
};
