import axios from "axios";
const PORT = 8105;
export const getAllEvents = async (dateRange, port = PORT) => {
  const formattedDate = formatDate(dateRange);
  // console.log("formattedDate", formattedDate);
  const endPoint = `/HR/meetings?page_size=30&page_number=1&from=${formattedDate.startDate}&to=${formattedDate.endDate}&type=scheduled`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;
  // console.log("getAllEvents===>", URL);
  let Config = {
    headers: {
      // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ii1jOGxOYV81UUVtdkt0RFY1cGxsX1EiLCJleHAiOjE2OTYwNzEwMDAsImlhdCI6MTY4NTY5NzYxMn0.zSYOC8S8yOA61s2RGwF2BmTDrCbeJ_a1D-djl_UTZbA`,
    },
  };

  let data = {
    hrEmail: "dev.wissda@gmail.com",
  };

  return await axios.post(URL, data, Config).then((res) => res.data);
};

const formatDate = (dateRange) => {
  const startDateString = dateRange.startDate;
  const date1 = new Date(startDateString);
  // Get the day
  const day = date1.getDate();
  // Get the month
  const month = date1.getMonth() + 1;
  // Get the year
  const year = date1.getFullYear();
  const newStartData = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  const endDateString = dateRange.endDate;
  const date2 = new Date(endDateString);
  // Get the day
  const day2 = date2.getDate();
  // Get the month
  const month2 = date2.getMonth() + 1;
  // Get the year
  const year2 = date2.getFullYear();
  const newEndData = `${year2}-${month2 < 10 ? "0" + month2 : month2}-${
    day2 < 10 ? "0" + day2 : day2
  }`;

  return {
    startDate: newStartData,
    endDate: newEndData,
  };
};
