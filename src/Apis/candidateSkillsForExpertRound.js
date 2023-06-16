import axios from "axios";
const PORT = 8105;

export const candidateSkillsForExpertRound = async (
  candidateId,
  port = PORT
) => {
  const endPoint = `/api/v1/round5/get/languages`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  let data = {
    // id: "mvananthu@gmail.com",
    id: candidateId,
  };
  let Config = {};
  return await axios.post(URL, data, Config).then((res) => res.data);
};
