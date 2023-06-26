import axios from "axios";
const PORT = 8105;
export const getCandidateId = async (meet_id, port = PORT) => {
  // hard coding for testing // need to remove later
  // meet_id = 82561060510;
  // meet_id = 84813219402;
  const endPoint = `/candidate/details/${meet_id}`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = {};
  return await axios.post(URL, data, Config).then((res) => res.data);
};

export const getCandidateDetails = async (candidateId, port = PORT) => {
  // hard coding for testing // need to remove later

  const endPoint = `/candidate/details/score`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = {
    // id: "mvananthu@gmail.com",
    id: candidateId,
  };

  return await axios.post(URL, data, Config).then((res) => res.data);
};

export const r3Result = async (candidateId, port = PORT) => {
  const endPoint = `/get/section/ratings`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const data = {
    // id: "mvananthu@gmail.com",
    id: candidateId,
  };

  return await axios.post(URL, data, Config).then((res) => res.data);
};

export const getCandidateResume = async (candidateId, port = 9000) => {
  // hard coding for testing // need to remove later
  const endPoint = `/downloadblob`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  const data = {
    // id: "mvananthu@gmail.com",
    id: candidateId,
  };
  const config = {
    url: URL,
    method: "POST",
    responseType: "blob", // Specify the response type as 'blob'
    data: data, // Include the request body data
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  return await axios(config).then((response) => {
    // Create a URL for the file blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url;
  });
};
