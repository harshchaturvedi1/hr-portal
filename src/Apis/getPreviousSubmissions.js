import axios from "axios";
const PORT = 8105;

const dummyRes = [
  {
    candidateName: "Ananthu Vruthu",
    dateOfInterview: "21-06-2023",
    nextRound: [
      {
        alloted: true,
        nextRound: "24 hours",
      },
    ],
    candidateId: "qa.wissda@gmail.com",
  },
  {
    candidateName: "Ananthu Vruthu",
    dateOfInterview: "10-06-2023",
    nextRound: [
      {
        alloted: false,
      },
    ],
    candidateId: "tester.wissda@gmail.com",
  },
];

export const getPreviousSubmissions = async (hrId, port = PORT) => {
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const endPoint = "/hr/submission";
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  const data = {
    // hrId: "dev.wissda@gmail.com",
    hrId: hrId,
    date: currentData(),
  };
  //   console.log("getPreviousSubmissions==>", data);
  return await axios.post(URL, data, Config).then((res) => res.data);
  // return dummyRes;
};

function currentData() {
  var today = new Date();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var date = today.getDate() + "-" + month + "-" + today.getFullYear();
  // var date = "11-07-2023";
  return date;
}
