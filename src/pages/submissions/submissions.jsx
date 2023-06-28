import "./submissions.scss";
import data from "../../mockData/submissiondetails.json";
import { useEffect, useState } from "react";
import { HrSubmission } from "../../components/hrSubmission/hrSubmission";
import { getPreviousSubmissions } from "../../Apis/getPreviousSubmissions";
export const Submissions = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");

  const handleGetSubmissions = async () => {
    try {
      const hrId = "dev.wissda@gmail.com";
      const port = 8105;
      const res = await getPreviousSubmissions(hrId, port);
      setCandidateData([...res]);
      setFilteredData([...res]);
      console.log("handleGetSubmissions===>", res);
    } catch (err) {
      console.log("handleGetSubmissions==>", err);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.trim().toLowerCase();

    const filteredItems = candidateData.filter((item) =>
      item.candidateName.toLowerCase().includes(query)
    );
    setFilteredData([...filteredItems]);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setFilteredData([...candidateData]);
    }
    // if (e.target.value.length < 2) {
    // return;
    // } else {
    handleSearch(e);
    // }
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
              <input
                type="text"
                placeholder="Search by Candidate Name"
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="icon">
              <img src={"./search-icon.svg"} alt="search" />
            </div>
          </div>
        </div>
        <CandidateData
          data={filteredData}
          handleGetSubmissions={handleGetSubmissions}
          setCandidateData={setCandidateData}
        />
      </div>
    </div>
  );
};

const CandidateData = ({ data, handleGetSubmissions, setCandidateData }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState({});

  const handleClick = (ele) => {
    if (!ele?.nextRound?.[0]?.alloted) {
      setSelectedId(ele);
      setShowPopUp(true);
    }
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
      {showPopUp && (
        <HrSubmission
          setShowPopUp={setShowPopUp}
          candidate={selectedId}
          handleGetSubmissions={handleGetSubmissions}
          setCandidateData={setCandidateData}
        />
      )}
    </>
  );
};
