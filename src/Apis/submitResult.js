import axios from "axios";
const PORT = 8105;
export const submitCandidateResult = async (
  items,
  ratings,
  comments,
  id,
  port = PORT
) => {
  let Config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const endPoint = `/api/v1/round3/submit`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;

  const data = formatSubmitData(items, ratings, comments, id);
  console.log("submitCandidateResult ===>", data);
  return await axios.post(URL, data, Config).then((res) => res.data);
};

const formatSubmitData = (items, ratings, comments, id) => {
  let combineRatingAndTopic = [];
  items.forEach((element, index) => {
    combineRatingAndTopic.push({
      section: element.title,
      rating: ratings[index],
    });
  });

  const data = {
    id: id,
    sections: combineRatingAndTopic,
    comments: comments,
  };
  return data;
};
