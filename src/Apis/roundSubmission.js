import axios from "axios";

const PORT = 8105;

export const submitRound = async (roundName, candidateId, port = PORT) => {
  let Config = {
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    // },
  };
  //   https://qa.wissda.cloud:8100/api/v1/assessment/round2/status
  const endPoint = `/api/v1/assessment/${roundName}/status`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;

  const data = {
    // id: "dev.wissda@gmail.com",
    id: candidateId,
    status: true,
  };
  return await axios.post(URL, data, Config).then((res) => res.data);
};
