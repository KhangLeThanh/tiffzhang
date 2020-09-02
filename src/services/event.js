import axios from "axios";

const baseUrl = "https://morning-island-01744.herokuapp.com/api/events";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
