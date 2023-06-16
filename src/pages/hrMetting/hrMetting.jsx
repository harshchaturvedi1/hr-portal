import { useEffect, useState } from "react";
import styles from "./hrMetting.module.css";
import ZoomMetting from "../../components/zoomScreen/zoomScreen";
import { useNavigate } from "react-router-dom";
import { getCandidateResume } from "../../Apis/candidateDetails";
import { submitCandidateResult } from "../../Apis/submitResult";
import Select from "react-select";
import { submitHrResult } from "../../Apis/submitHrResult";
// all constants------------------------------------------
const items = [
  {
    title: "Technical Ability",
    description: [
      {
        desc: "Inquire about the automated /coding tests results and ask questions from the test        ",
      },
      {
        desc: " Ask 5 fundamental questions that will be randomly pulled from the technical question banks based on the level of the candidates",
      },
      {
        desc: "Probe more with following questions:",
        subdesc: [
          " Explain in detail your last project worked on and the specific role played? ",
          " Technology stack worked on the project",
        ],
      },
    ],
  },
  {
    title: "Customer Focus",
    description: [],
  },
  {
    title: "Result Orientation",
    description: [],
  },
  {
    title: "Self Motivation",
    description: [],
  },
  {
    title: "Ability to work independently",
    description: [],
  },
  {
    title: "Result Orientation",
    description: [],
  },
  {
    title: "Result Orientation",
    description: [],
  },
];
const starDesc = [
  "Overcome Obstacles & Stretches",
  "Consistency in Performance",
  "Does bare minimum",
  " Does not exhibit",
  "** If score is above 2 in any of these competencies, the candidature will be rejected  ",
  "*** If total score is above 2.5 in any of these competencies, the candidature will be rejected",
];
const MAX_RATING = 5;

// all constants-------------------------------------------

const HrMetting = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratings, setRatings] = useState(Array(items.length).fill(0));
  const [totalRatings, setTotalRatings] = useState(0);
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setSelectedItem(index === selectedItem ? null : index);
  };

  const handleTotalRatings = (data) => {
    // console.log("ratings", data);
    let total = 0;
    let count = 0;
    data.forEach((element) => {
      if (element) {
        total += element;
        count++;
      }
    });
    let resRating = total / count;
    resRating = resRating.toFixed(2);
    setTotalRatings(resRating);
  };

  const handleRatingChange = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    handleTotalRatings(newRatings);
    setRatings(newRatings);
  };

  const handleSubmit = async () => {
    console.log("submitted", ratings);
    const id = sessionStorage.getItem("candidateId");
    const res = await submitCandidateResult(items, ratings, comments, id);
    console.log("handleSubmit r3 final ====>", res);
    navigate("/roundFinal");
  };

  const Ratings = () => {
    return (
      <>
        <div className={styles.itemList}>
          {items.map((item, index) => (
            <div key={index} className={styles.eachItem}>
              <div
                className={`${styles.itemTitle} ${
                  selectedItem === index ? styles.selected : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <span className={styles.arrow}>
                  <img
                    src={"./down-arrow.svg"}
                    alt=""
                    style={{
                      transform: `${
                        selectedItem === index ? "rotate(180deg)" : ""
                      }`,
                    }}
                  />
                </span>
                <span>{item.title}</span>
                <span className={styles.itemRating}>
                  {Array(MAX_RATING)
                    .fill()
                    .map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.star} ${
                          i < ratings[index] ? styles.filled : ""
                        }`}
                        onClick={() => handleRatingChange(index, i + 1)}
                      >
                        ★
                      </span>
                    ))}
                </span>
              </div>
              {selectedItem === index && (
                <div>
                  {item.description.map((ele, i) => (
                    <div key={i}>
                      <div>
                        {i + 1}. {ele.desc}
                      </div>
                      {ele?.subdesc?.length > 0 && (
                        <div>
                          {ele.subdesc.map((content, i) => (
                            <div key={i}>
                              {String.fromCharCode(97 + i)} {")"} {content}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className={styles.totalScore}>
            <div className={styles.totalValue}>
              <div>Total Score</div>
              <div>(average of all competencies score)</div>
            </div>
            <div>{totalRatings} ★</div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    document.body.style.overflow = "scroll";
  }, []);

  return (
    <div className={styles.container}>
      <ZoomScreen
        comments={comments}
        setComments={setComments}
        handleSubmit={handleSubmit}
      />
      {/* ratings part */}

      <Ratings />
    </div>
  );
};

const ZoomScreen = ({ comments, setComments, handleSubmit }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [clientName, setClientName] = useState("LOREM IPSUM");
  const [zoomUrl, setZoomUrl] = useState(sessionStorage.getItem("zoomUrl"));
  const [candidateName, setCandidateName] = useState(
    sessionStorage.getItem("candidateName")
  );
  const [meetDate, setMeetDate] = useState("");
  const [viewPopUp, setViewPopUp] = useState(false);
  const [viewFinalPage, setViewFinalPage] = useState(false);
  const [r1r, setR1r] = useState(sessionStorage.getItem("r1Rating"));
  const [r2r, setR2r] = useState(sessionStorage.getItem("r2Rating"));
  const navigate = useNavigate();

  const handleFormatDate = () => {
    const date = new Date(sessionStorage.getItem("meet_date"));
    const formattedDate = date.toLocaleDateString("en-GB"); // Use "en-GB" for dd/mm/yyyy format
    setMeetDate(formattedDate);
  };

  const handleViewResume = async () => {
    try {
      const res = await getCandidateResume(
        sessionStorage.getItem("candidateId")
      );
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

  const handleResultSubmit = () => {
    handleSubmit();
  };

  useEffect(() => {
    handleFormatDate();
  }, []);

  return (
    <div>
      <div className={styles.zoomScreen}>
        <ZoomMetting zoomUrl={zoomUrl} />
      </div>
      <div className={styles.details}>
        <div className={styles.meetDetails}>
          <div>{candidateName}</div>
          <div>CANDIDATE NAME</div>
        </div>
        <div className={styles.meetDetails}>
          <div>{meetDate}</div>
          <div>DATE OF INTERVIEW</div>
        </div>
        {/* <div className={styles.meetDetails}>
          <div>{clientName}</div>
          <div>CLIENT NAME</div>
        </div> */}
        <div className={styles.meetDetails}>
          <div>{r1r}</div>
          <div>R1 Rating</div>
        </div>
        <div className={styles.meetDetails}>
          <div>{r2r}</div>
          <div>R2 Rating</div>
        </div>
      </div>
      <div>
        <button className={styles.resume} onClick={() => handleViewResume()}>
          Download Resume
        </button>
      </div>
      <div>
        <div className={styles.comment}>
          <input
            type="text"
            placeholder="Add your comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className={styles.knowMore}>
          <div onClick={() => setViewDetails(!viewDetails)}>
            <div>
              <div>
                Know more about <span>★</span>
              </div>
            </div>
            <div>
              <img
                style={{
                  transform: `${viewDetails ? "rotate(180deg)" : ""}`,
                }}
                src={"./down-arrow.svg"}
                alt="view"
              />
            </div>
          </div>
          <div className={styles.startDetails}>
            {viewDetails &&
              starDesc.map((item, index) => (
                <div key={index} className={styles.eachStar}>
                  <span>{index < 4 && index + 1}</span>
                  <span>{index < 4 && "★"}</span>
                  <span>
                    {" "}
                    {index < 4 && "-"} {item}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <button onClick={() => navigate("/calendarDetails")}>Go Back</button>
          <button onClick={() => setViewPopUp(true)}>Submit Result</button>
        </div>
      </div>

      {viewPopUp ? (
        viewFinalPage ? (
          <SubmitPopUp
            setViewPopUp={setViewPopUp}
            handleResultSubmit={handleResultSubmit}
            setViewFinalPage={setViewFinalPage}
          />
        ) : (
          <NextSteps
            setViewPopUp={setViewPopUp}
            setViewFinalPage={setViewFinalPage}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
};

const NextSteps = ({ setViewPopUp, setViewFinalPage }) => {
  const [options, setOptions] = useState([
    { value: "Not eligible", label: "Not eligible" },
    { value: "2hrs", label: "2hrs Round" },
    { value: "48hrs", label: "48hrs Round" },
  ]);

  const [isDisabled, setIsdisabled] = useState(true);
  const [project, setProject] = useState("");

  const handleOptionChange = (val) => {
    setProject(val.value);
    setIsdisabled(false);
  };

  const handleResultSubmit = async () => {
    try {
      const c_id = sessionStorage.getItem("candidateId");
      const res = await submitHrResult(project, c_id);
      console.log("handleResultSubmit===>", res);
      setViewFinalPage(true);
    } catch (err) {
      console.log("handleResultSubmit ==> ", err);
    }
  };

  return (
    <div className={styles.mainPopUp}>
      <div className={styles.first}>
        {/* img cross */}
        <div className={styles.second}>
          <img
            onClick={() => {
              setViewPopUp(false);
              setViewFinalPage(false);
            }}
            src={"./Close.svg"}
            alt=""
          />
        </div>
        <div className={styles.third}>
          Which type of project should be assigned for next Round?
        </div>

        <div className={styles.dropDown}>
          <Select
            className={styles.selectStyle}
            options={options}
            onChange={handleOptionChange}
          />
        </div>

        <div className={styles.fourth}>
          You can skip and add later under Profile/Submissions within 24hrs
        </div>
        <div className={styles.fifth}>
          <button onClick={() => setViewFinalPage(true)}>Skip for now</button>
          <button
            style={{
              opacity: `${isDisabled ? "0.7" : "1"}`,
              cursor: `${isDisabled ? "not-allowed" : "pointer"}`,
            }}
            onClick={() => handleResultSubmit()}
            disabled={isDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const SubmitPopUp = ({
  setViewPopUp,
  handleResultSubmit,
  setViewFinalPage,
}) => {
  return (
    <div className={styles.mainPopUp}>
      <div className={styles.first}>
        {/* img cross */}
        <div className={styles.second}>
          <img
            onClick={() => {
              setViewPopUp(false);
              setViewFinalPage(false);
            }}
            src={"./Close.svg"}
            alt=""
          />
        </div>
        <div className={styles.third}>
          Are you sure you want to submit the results?
        </div>
        <div className={styles.fourth}>
          Once submitted, you will not be able to modify any ratings or
          comments.
        </div>
        <div className={styles.fifth}>
          <button
            onClick={() => {
              setViewPopUp(false);
              setViewFinalPage(false);
            }}
          >
            Cancel
          </button>
          <button onClick={() => handleResultSubmit()}>Submit Results</button>
        </div>
      </div>
    </div>
  );
};

export default HrMetting;
