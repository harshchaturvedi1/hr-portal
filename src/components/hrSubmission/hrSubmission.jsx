import { useEffect, useState } from "react";
import "./hrSubmission.scss";
import Select from "react-select";
import { getCandidateDetails, r3Result } from "../../Apis/candidateDetails";
import { submitHrResult } from "../../Apis/submitHrResult";

export const HrSubmission = ({
  candidate,
  setShowPopUp,
  handleGetSubmissions,
  setCandidateData,
}) => {
  const [project, setProject] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  const [options, setOptions] = useState([
    { value: "Not eligible", label: "Not eligible" },
    { value: "2hrs", label: "2hrs Round" },
    { value: "48hrs", label: "48hrs Round" },
  ]);
  const [r1andr2Result, setR1AndR2Result] = useState({});
  const [r3Data, setR3Data] = useState();
  const handleOptionChange = (val) => {
    setProject(val.value);
    setIsdisabled(false);
  };

  const r1Andr2Score = async () => {
    try {
      const port = 8105;
      const candidateId = candidate?.candidateId;
      // const candidateId = "mvananthu@gmail.com";
      const res = await getCandidateDetails(candidateId, port);
      console.log("r1Andr2Score===>", res);
      setR1AndR2Result({ ...res });
    } catch (err) {
      console.log("r1Andr2Score===>", err);
    }
  };

  const r3Ratings = async () => {
    try {
      const port = 8105;
      const candidateId = candidate?.candidateId;
      // const candidateId = "mvananthu@gmail.com";
      const res = await r3Result(candidateId, port);
      console.log("r3Ratings====>", res);
      setR3Data({ ...res });
    } catch (err) {
      console.log("r3Ratings==>", err);
    }
  };

  const handleResultSubmit = async () => {
    try {
      const c_id = candidate?.candidateId;
      // const c_id = "mvananthu@gmail.com";
      const port = 8105;
      const res = await submitHrResult(project, c_id, port);
      console.log("handleResultSubmit===>", res);
      setShowPopUp(false);
      setCandidateData([]);
      handleGetSubmissions();
    } catch (err) {
      console.log("handleResultSubmit ==> ", err);
    }
  };
  useEffect(() => {
    r1Andr2Score();
    r3Ratings();
  }, []);

  return (
    <div className="hr-submission">
      <div className="wrapper">
        {/* <div className="left" onClick={() => setShowPopUp(false)}></div> */}
        <div className="left"></div>
        <div className="right">
          <div className="cross" onClick={() => setShowPopUp(false)}>
            <img src={"./cross.svg.svg"} alt="" />
          </div>
          <div className="header"> Assign Next Round</div>
          <div className="title">
            <div>{candidate?.candidateName}</div>
            <div>Which type of project should be assigned for next Round?</div>
          </div>
          <div className="options">
            <div className="dropDown">
              <Select
                className="selectStyle"
                options={options}
                onChange={handleOptionChange}
              />
            </div>
            <div className="button-wrapper">
              <button
                style={{ opacity: isDisabled ? "0.7" : "1" }}
                disabled={isDisabled}
                title={isDisabled ? "Chhose an option" : ""}
                onClick={() => handleResultSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="prev">Previous Assessment Results</div>
          <div className="second">
            <div className="p-rounds">
              <div>
                Round 1:{" "}
                <span>
                  {r1andr2Result?.assessmentScoreRating?.round1Rating}
                </span>
              </div>
              <div>
                Round 2 :{" "}
                <span>
                  {r1andr2Result?.assessmentScoreRating?.round2Rating}
                </span>
              </div>
            </div>
            <div className="round-3"> Round 3 :</div>
            <RoundThree data={r3Data?.candidateRound3Scores} />
          </div>
          <div className="comments">{r3Data?.overallComment}</div>
        </div>
      </div>
    </div>
  );
};

const RoundThree = ({ data }) => {
  return (
    <>
      {data?.map((ele, index) => (
        <div className="r3-each">
          <div>{ele?.sectionName}</div>
          <div>
            {ele?.score} <span> ★</span>
          </div>
        </div>
      ))}
    </>
  );
};
