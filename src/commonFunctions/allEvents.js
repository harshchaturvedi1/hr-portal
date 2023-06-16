const moment = require("moment");

export const allEvents = (data) => {
  const tempData = [];
  data.forEach((element) => {
    let meetingDetails = { ...element };
    // set title
    meetingDetails["title"] = element["name"];
    // start time
    meetingDetails["start"] = element["start_time"];
    meetingDetails["meet_id"] = element["id"];
    // end time

    meetingDetails["end"] = getEndTime(
      element["start_time"],
      element["duration"]
    );
    meetingDetails["meet_dur"] = element["duration"];
    tempData.push(meetingDetails);
  });
  return tempData;
};

const getEndTime = (date, duration) => {
  const a = moment(date).add(duration, "minutes").toString();

  const b = moment(a).format("YYYY-MM-DDTHH:mm:ss");

  return b;
};
