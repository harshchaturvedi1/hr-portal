import { useState } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="wrapper">
        <div>WDP LOGO</div>
        <div className="account" onMouseEnter={() => setShowOptions(true)}>
          <div>
            <img src={"./account_circle.svg"} alt="" />
          </div>
          <div>
            <img src={"./down-arrow-white.svg"} alt="" />
          </div>
          {showOptions && (
            <div
              className="dropDown"
              onMouseLeave={() => setShowOptions(false)}
            >
              <div onClick={() => navigate("/submissions")}>Submission</div>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
