import "./submissions.scss";
import data from "../../mockData/submissiondetails.json";
import { useEffect, useState } from "react";
import { HrSubmission } from "../../components/hrSubmission/hrSubmission";
import { getPreviousSubmissions } from "../../Apis/getPreviousSubmissions";
export const Submissions = () => {
  const [candidateData, setCandidateData] = useState([]);

  const handleGetSubmissions = async () => {
    try {
      const hrId = "dev.wissda@gmail.com";
      const port = 8105;
      const res = await getPreviousSubmissions(hrId, port);
      setCandidateData([...res]);
      console.log("handleGetSubmissions===>", res);
    } catch (err) {
      console.log("handleGetSubmissions==>", err);
    }
  };

  useEffect(() => {
    handleGetSubmissions();
  }, []);

  return (
    <div className="submission-container">
      <div className="wrapper">
        <div className="first">
          <div className="title">
            <p>My Submissions</p>
          </div>
          <div className="search">
            <div className="search-input">
              <input type="text" placeholder="Search by Candidate Name" />
            </div>
            <div className="icon">
              <img src={"./search-icon.svg"} alt="search" />
            </div>
          </div>
        </div>
        <CandidateData data={candidateData} />
      </div>
    </div>
  );
};

const CandidateData = ({ data }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleClick = (ele) => {
    if (!ele?.nextRound?.[0]?.alloted) setShowPopUp(true);
  };

  return (
    <>
      <div className="second">
        <div className="eachitem">
          <div>Candidate Name</div>
          <div>Date of Interview</div>
          <div>Next Round Allotment</div>
          <div></div>
        </div>
        {data?.map((ele, index) => (
          <div
            className="eachitem"
            key={index}
            onClick={() => handleClick(ele)}
            style={{ cursor: !ele?.nextRound?.[0]?.alloted ? "pointer" : "" }}
          >
            <div>{ele?.candidateName}</div>
            <div>{ele?.dateOfInterview}</div>
            {ele?.nextRound?.[0]?.alloted ? (
              <div>{ele?.nextRound?.[0]?.nextRound}</div>
            ) : (
              <div className="assign">Assign</div>
            )}
            <div className="next-round">
              {!ele?.nextRound?.[0]?.alloted && (
                <img src={"./right-arrow-full.svg"} alt="" />
              )}
            </div>
          </div>
        ))}
      </div>
      {showPopUp && <HrSubmission setShowPopUp={setShowPopUp} />}
    </>
  );
};
