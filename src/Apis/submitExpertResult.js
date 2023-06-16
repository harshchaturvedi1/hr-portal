import axios from "axios";
const PORT = 8105;

export const SubmitRound5Result = async (
  items,
  ratings,
  comments,
  inputForR4,
  totalRatings,
  r5Titles,
  ratingsR5,
  inputForR5,
  id,
  port = PORT
) => {
  const endPoint = `/api/v1/round5/save`;
  const URL = process.env.REACT_APP_BASE_URL + ":" + port + endPoint;

  console.log("SubmitRound5Result===>", URL);

  const data = await formatData(
    items,
    ratings,
    comments,
    inputForR4,
    totalRatings,
    r5Titles,
    ratingsR5,
    inputForR5,
    // (id = "mvananthu@gmail.com")
    id
  );
  let Config = {};
  return await axios.post(URL, data, Config).then((res) => res.data);
};

const formatData = async (
  items,
  ratings,
  comments,
  inputForR4,
  totalRatings,
  r5Titles,
  ratingsR5,
  inputForR5,
  id
) => {
  let combineRatingAndTopic = [];
  items.forEach((element, index) => {
    combineRatingAndTopic.push({
      section: element.title,
      rating: ratings[index],
      comments: inputForR4[index],
    });
  });

  let r5Combined = [];
  r5Titles.forEach((element, index) => {
    r5Combined.push({
      language: element,
      rating: ratingsR5[index],
      comments: inputForR5[index],
    });
  });

  let data = {
    name: id,
    round4Assessment: {
      sections: combineRatingAndTopic,
      totalScore: Number(totalRatings),
      comments: comments,
    },
    round5Assessment: r5Combined,
    totalScore: Number(totalRatings),
  };

  return data;
};
