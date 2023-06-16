import axios from "axios";
const PORT = 8105;
export const submitHrResult = async (project, c_id, port = PORT) => {
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const endPoint = `/api/v1/round3/submit/hr/status`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;

  const name = c_id;
  const isEligibleForRound4 = project === "Not eligible" ? false : true;

  const data = {
    name: name,
    isEligibleForRound4: isEligibleForRound4,
  };

  if (isEligibleForRound4) {
    data["typeOfProject"] = project;
  }
  console.log("submitHrResult ==>", data);

  return await axios.post(URL, data, Config).then((res) => res.data);
};
