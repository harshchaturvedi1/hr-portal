import axios from "axios";
const PORT = 8105;
export const downloadProject = async (candidateId, endRoute, port = PORT) => {
  const endPoint = `/api/v1/round5/get/project`;
  const URL =
    process.env.REACT_APP_BASE_URL + ":" + port + endPoint + "/" + endRoute;
  //   console.log("downloadProject ===>", URL);
  const data = {
    // name: "mvananthu@gmail.com",
    name: candidateId,
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
