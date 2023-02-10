import axios from "axios";
const BASE_URL_LOYALTY = import.meta.env.VITE_BACKEND_URL_LOYALTY;

const axiosClientLoyalty= axios.create({
    baseURL:`${BASE_URL_LOYALTY}/loyalty/v1`
  })

const config = (token, sucursalId, channel) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "sucursalId": "1013312",
    "channel": "android"
  }
});
export {
  axiosClientLoyalty,
  config
} 