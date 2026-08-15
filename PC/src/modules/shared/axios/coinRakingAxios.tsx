import axios from "axios";

const coinRakingAxios = axios.create({
  baseURL: "/api/https://coinranking.com/api/v2/",
});

export default coinRakingAxios;
