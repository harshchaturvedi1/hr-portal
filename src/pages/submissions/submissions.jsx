import "./submissions.scss";
import data from "../../mockData/submissiondetails.json";
export const Submissions = () => {
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
        <CandidateData data={data} />
      </div>
    </div>
  );
};

const CandidateData = ({ data }) => {
  return (
    <div className="second">
      <div className="eachitem">
        <div>Candidate Name</div>
        <div>Date of Interview</div>
        <div>Next Round Allotment</div>
        <div></div>
      </div>
      {data?.map((ele, index) => (
        <div className="eachitem" key={index}>
          <div>{ele?.name}</div>
          <div>{ele?.dateOfInterview}</div>
          {ele?.nextRound?.alloted ? (
            <div>{ele?.nextRound?.nextRound}</div>
          ) : (
            <div className="assign">Assign</div>
          )}
          <div>
            <img src={"./right-arrow-full.svg"} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};
