import { useEffect, useState } from "react";
import styles from "./eventDetails.module.css";
import { useNavigate } from "react-router-dom";
import {
  getCandidateDetails,
  getCandidateId,
  getCandidateResume,
} from "../../Apis/candidateDetails";

const EventDetails = ({ handleClosePopup, selectedEvent }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    ...selectedEvent["_def"]["extendedProps"],
  });
  const [dateAndTime, setDateAndTime] = useState({
    date: "",
    time: "",
  });
  const [candidateId, setCandidateId] = useState("");
  const [candidateProfile, setCandidateProfile] = useState({});
  const handleDownload = async () => {
    try {
      const res = await getCandidateResume(candidateId);
      const downloadLink = document.createElement("a");
      downloadLink.href = res;
      // Set the file name
      downloadLink.setAttribute("download", "resume.pdf");
      // Trigger the download by programmatically clicking the link
      downloadLink.click();
      console.log("handleDownload==>", res);
    } catch (err) {
      console.log("handleDownload error ==>", err);
    }
  };

  const handleJoinMetting = () => {
    sessionStorage.setItem("zoomUrl", event.join_url);
    sessionStorage.setItem("meet_date", event.start_time);
    sessionStorage.setItem(
      "candidateName",
      candidateProfile?.developerResponse?.fullName
    );
    sessionStorage.setItem(
      "r1Rating",
      candidateProfile?.assessmentScoreRating?.round1Rating
    );
    sessionStorage.setItem(
      "r2Rating",
      candidateProfile?.assessmentScoreRating?.round2Rating
    );
    sessionStorage.setItem("candidateId", candidateId);
    navigate("/hrMetting");
    document.body.style.overflow = "scroll";
  };

  const getDateForEvenDetails = (data) => {
    const dateString = data;
    const date = new Date(dateString);

    // Get the day
    const day = date.getDate();

    // Get the month
    const month = date.toLocaleString("en-US", { month: "long" });

    // Get the year
    const year = date.getFullYear();

    return `${day}  ${month}  ${year}`;
  };

  const getTimeForEvent = (data) => {
    const dateString = data;
    const date = new Date(dateString);
    const hr = date.getHours();
    const mm = date.getMinutes();
    return `${hr} : ${mm === 0 ? "0" + mm : mm} `;
  };

  const handleSetDateAndTime = () => {
    const date = getDateForEvenDetails(event.start_time);
    const time = getTimeForEvent(event.start_time);
    setDateAndTime({
      date,
      time,
    });
  };

  const handleCandidateDetails = async (candidateId) => {
    try {
      const res = await getCandidateDetails(candidateId);
      setCandidateProfile({ ...res });
      console.log(" handleCandidateDetails ==>", res);
    } catch (err) {
      console.log("error  in handleCandidateDetails ==>", err);
    }
  };

  const handleCandidateId = async () => {
    try {
      const res = await getCandidateId(event.meet_id);
      console.log("candidate id", res);
      setCandidateId(res.id);
      handleCandidateDetails(res.id);
    } catch (err) {
      console.log("error  in handleCandidateId ==>", err);
    }
  };

  useEffect(() => {
    handleSetDateAndTime();
    handleCandidateId();
    console.log("selectedEvent", event);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.first}>WDP HR & Tech Round</div>
          <div className={styles.close} onClick={() => handleClosePopup()}>
            <img src={"./Close.svg"} alt="close" />
          </div>
        </div>
        <div className={styles.second}>
          <div>
            <div className={styles.third}>
              Upcoming Meeting for Amit Sharma{" "}
            </div>
            <div className={styles.fourth}>{event.name}</div>
            <div className={styles.fifth}>
              <div>
                <img src={"./calendar-red.svg"} alt="" />
              </div>
              <div>{dateAndTime.date}</div>
            </div>
            <div className={styles.fifth}>
              <div>
                <img src={"./clock-regular.svg"} alt="" />
              </div>
              <div>
                {dateAndTime.time} ({event.meet_dur} minutes)
              </div>
            </div>
          </div>
          <div className={styles.sixth}>
            <button onClick={handleJoinMetting}>Join the Meeting</button>
            <button onClick={handleDownload}>Download Resume</button>
          </div>
        </div>
        <div className={styles.seventh}>
          <div>Candidate Details</div>
          <div>Name : {candidateProfile?.developerResponse?.fullName}</div>
          <div>
            Experience :{" "}
            {candidateProfile?.developerResponse?.experienceInYears}{" "}
          </div>
          <div>
            Round 1 ratings :{" "}
            {candidateProfile?.assessmentScoreRating?.round1Rating}
          </div>
          <div>
            Round 2 ratings :{" "}
            {candidateProfile?.assessmentScoreRating?.round2Rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
