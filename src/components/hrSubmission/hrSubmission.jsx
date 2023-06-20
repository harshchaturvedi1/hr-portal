import "./hrSubmission.scss";

export const HrSubmission = ({ candidateId, setShowPopUp }) => {
  return (
    <div className="hr-submission">
      <div className="wrapper">
        <div className="left" onClick={() => setShowPopUp(false)}></div>
        <div className="right">
          <div className="title">
            <div>Sharath Gowda G</div>
            <div>Previous Assessment round Performance</div>
          </div>
          <div className="second">
            <div className="p-rounds">
              <div>
                Round 1: <span>3/5</span>
              </div>
              <div>
                Round 2 : <span>3/5</span>
              </div>
            </div>
            <div className="round-3"> Round 3 :</div>
          </div>
        </div>
      </div>
    </div>
  );
};
