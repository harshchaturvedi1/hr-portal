import { useState } from "react";
import "./hrSubmission.scss";
import Select from "react-select";

export const HrSubmission = ({ candidateId, setShowPopUp }) => {
  const [project, setProject] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  const [options, setOptions] = useState([
    { value: "Not eligible", label: "Not eligible" },
    { value: "2hrs", label: "2hrs Round" },
    { value: "48hrs", label: "48hrs Round" },
  ]);

  const handleOptionChange = (val) => {
    setProject(val.value);
    setIsdisabled(false);
  };
  return (
    <div className="hr-submission">
      <div className="wrapper">
        <div className="left" onClick={() => setShowPopUp(false)}></div>
        <div className="right">
          <div className="cross" onClick={() => setShowPopUp(false)}>
            <img src={"./cross.svg.svg"} alt="" />
          </div>
          <div className="header"> Assign Next Round</div>
          <div className="title">
            <div>Sharath Gowda G</div>
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
