import { useEffect, useState } from "react";
import styles from "./candidateDetails.module.css";
import { useNavigate } from "react-router-dom";
import {
  getCandidateDetails,
  getCandidateId,
  getCandidateResume,
} from "../../../Apis/candidateDetails";
import { languageAndFramework } from "../../../Apis/languageAndFramework";
import { downloadProject } from "../../../Apis/downloadProject";

export const CandidateDetails = ({ handleClosePopup, selectedEvent }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    ...selectedEvent["_def"]["extendedProps"],
  });
  const [dateAndTime, setDateAndTime] = useState({
    date: "",
    time: "",
  });
  const [candidateId, setCandidateId] = useState("");
  const [candidateSkills, setCandidateSkills] = useState([]);
  const [candidateProfile, setCandidateProfile] = useState({});
  const handleDownload = async () => {
    try {
      const port = 9000;
      const res = await getCandidateResume(candidateId, port);
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
    sessionStorage.setItem("candidateId", candidateId);
    sessionStorage.setItem(
      "r1Rating",
      candidateProfile?.assessmentScoreRating?.round1Rating
    );
    sessionStorage.setItem(
      "r2Rating",
      candidateProfile?.assessmentScoreRating?.round2Rating
    );
    document.body.style.overflow = "scroll";
    navigate("/expertMetting");
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
      const port = 8105;
      const res = await getCandidateDetails(candidateId, port);
      setCandidateProfile({ ...res });
      console.log(" handleCandidateDetails ==>", res);
    } catch (err) {
      console.log("error  in handleCandidateDetails ==>", err);
    }
  };

  const handleLangAndFrame = async (candidateId) => {
    try {
      const port = 8100;
      const res = await languageAndFramework(candidateId, port);
      console.log("handleLangAndFrame==>", res);
      let temp = [];
      for (const key in res) {
        temp.push(res[key]);
      }
      setCandidateSkills([...temp]);
    } catch (err) {
      console.log("handleLangAndFrame ===>", err);
    }
  };

  const handleCandidateId = async () => {
    try {
      const port = 8108;
      const res = await getCandidateId(event.meet_id, port);
      console.log("candidate id", res);
      setCandidateId(res.id);
      handleCandidateDetails(res.id);
      handleLangAndFrame(res.id);
    } catch (err) {
      console.log("error  in handleCandidateId ==>", err);
    }
  };

  useEffect(() => {
    handleSetDateAndTime();
    handleCandidateId();
    // console.log("selectedEvent===>", event);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.first}>Expert Round</div>
          <div className={styles.close} onClick={() => handleClosePopup()}>
            <img src={"./Close.svg"} alt="close" />
          </div>
        </div>
        <MeetDetails
          event={event}
          dateAndTime={dateAndTime}
          handleJoinMetting={handleJoinMetting}
          handleDownload={handleDownload}
        />
        <NameAndExp
          name={candidateProfile?.developerResponse?.fullName}
          experience={candidateProfile?.developerResponse?.experienceInYears}
        />
        <PreviousScores
          round1Rating={candidateProfile?.assessmentScoreRating?.round1Rating}
          round2Rating={candidateProfile?.assessmentScoreRating?.round2Rating}
        />
        {/* last topic */}
        <InterviewTopics candidateSkills={candidateSkills} />
        <ProjectButtons candidateId={candidateId} />
      </div>
    </div>
  );
};

const MeetDetails = ({
  event,
  dateAndTime,
  handleJoinMetting,
  handleDownload,
}) => {
  return (
    <div className={styles.second}>
      <div>
        <div className={styles.third}>Upcoming Meeting for Amit Sharma </div>
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
  );
};

const NameAndExp = ({ name, experience }) => {
  return (
    <div>
      <div className={`${styles.first} ${styles.marginTop}`}>
        Candidate Details
      </div>
      <div className={styles.seventh}>
        <div>
          Name : <span> {name}</span>
        </div>
        <div>
          Experience : <span>{experience} </span>
        </div>
      </div>
    </div>
  );
};

const PreviousScores = ({ round1Rating, round2Rating }) => {
  return (
    <div>
      <div className={`${styles.first} ${styles.marginTop}`}>
        Previous Assessment round Performance
      </div>
      <div className={styles.eighth}>
        <div>
          Round 1: <span> {round1Rating}</span>
        </div>
        <div>
          Round 2: <span> {round2Rating}</span>{" "}
        </div>
      </div>
    </div>
  );
};

const InterviewTopics = ({ candidateSkills }) => {
  return (
    <div className={styles.ninth}>
      <div>Language/Framework choosen for Interview: </div>
      <div className={styles.skills}>
        {candidateSkills?.map((item, index) => (
          <span>{item}</span>
        ))}
        {/* <span>Java</span> */}
        {/* <span>Javascript</span> */}
      </div>
    </div>
  );
};

const ProjectButtons = ({ candidateId }) => {
  const handleProjectDetails = async (endpoint) => {
    try {
      const port = 8107;
      const res = await downloadProject(candidateId, endpoint, port);
      console.log("handleProjectDetails ===>", res);
      const downloadLink = document.createElement("a");
      downloadLink.href = res;
      // Set the file name
      if (endpoint === "question")
        downloadLink.setAttribute("download", "Questions.pdf");
      else if (endpoint === "submission")
        downloadLink.setAttribute("download", "Project.zip");
      // Trigger the download by programmatically clicking the link
      downloadLink.click();
    } catch (err) {
      console.log("handleProjectDetails===>", err);
    }
  };

  return (
    <div className={`${styles.sixth} ${styles.questions}`}>
      <button onClick={() => handleProjectDetails("question")}>
        Download Question
      </button>
      <button onClick={() => handleProjectDetails("submission")}>
        Download Project
      </button>
    </div>
  );
};
