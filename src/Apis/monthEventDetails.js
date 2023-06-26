import axios from "axios";
const PORT = 8105;

export const currentMonthEvents = async (port = PORT) => {
  let Config = {
    headers: {
      // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ii1jOGxOYV81UUVtdkt0RFY1cGxsX1EiLCJleHAiOjE2OTYwNzEwMDAsImlhdCI6MTY4NTY5NzYxMn0.zSYOC8S8yOA61s2RGwF2BmTDrCbeJ_a1D-djl_UTZbA`,
    },
  };

  const endPoint = `/meetings/completed/pending?page_size=80&page_number=1&type=scheduled`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;

  const data = currentMonthData();
  console.log("currentMonthEvents===>", data);
  return await axios.post(URL, data, Config).then((res) => res.data);
};

const currentMonthData = () => {
  // Get today's date
  var today = new Date();

  // Extract the month number from the date
  var month = String(today.getMonth() + 1).padStart(2, "0");

  // Format the date as "YYYY-MM-DD"
  var formattedDate = today.getFullYear() + "-" + month + "-" + today.getDate();

  const data = {
    month: month,
    date: formattedDate,
    hrEmail: "dev.wissda@gmail.com",
  };
  return data;
};

export const getPendingProjects = async (port = PORT) => {
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const endPoint = `/count/pending/project`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;

  var today = new Date();

  // Extract the month number from the date
  var month = String(today.getMonth() + 1).padStart(2, "0");

  // Format the date as "YYYY-MM-DD"

  var formattedDate =
    +today.getDate() + "-" + month + "-" + today.getFullYear();

  const data = {
    date: formattedDate,
    hrId: "dev.wissda@gmail.com",
  };

  return await axios.post(URL, data, Config).then((res) => res.data);
};
