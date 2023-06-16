import { useEffect, useState } from "react";
import styles from "./expertMetting.module.css";
import ZoomMetting from "../../components/zoomScreen/zoomScreen";
import { useNavigate } from "react-router-dom";
import { getCandidateResume } from "../../Apis/candidateDetails";
import { candidateSkillsForExpertRound } from "../../Apis/candidateSkillsForExpertRound";
import { SubmitRound5Result } from "../../Apis/submitExpertResult";
import { submitRound } from "../../Apis/roundSubmission";
// all constants------------------------------------------
const items = [
  {
    title: "Problem Solving",
    description: [
      {
        desc: "1. Inquire about the automated /coding tests results and ask questions from the test",
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
    title: "Technical Abilities(language and Efficiency of code) ",
  },
  {
    title: "Solution Approach ",
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

const MAX_RATING = 4;

// all constants-------------------------------------------

export const ExpertMetting = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem5, setSelectedItem5] = useState(null);
  const [ratings, setRatings] = useState(Array(items.length).fill(0));
  const [ratingsR5, setRatingsR5] = useState([]);
  const [inputForR4, setinputForR4] = useState(Array(items.length).fill(""));
  const [inputForR5, setinputForR5] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [comments, setComments] = useState("");
  const [r5Titles, setR5Titles] = useState([]);
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setSelectedItem(index === selectedItem ? null : index);
  };
  const handleItemClick5 = (index) => {
    setSelectedItem5(index === selectedItem5 ? null : index);
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

  const handleR4Input = (e, index) => {
    let temp = inputForR4;
    temp[index] = e.target.value;
    setinputForR4([...temp]);
  };

  const handleR5Input = (e, index) => {
    let temp = inputForR5;
    temp[index] = e.target.value;
    setinputForR5([...temp]);
  };
  const handleRatingChange5 = (index, rating) => {
    const newRatings = [...ratingsR5];
    newRatings[index] = rating;
    setRatingsR5(newRatings);
  };

  const handleSubmit = async () => {
    try {
      const id = sessionStorage.getItem("candidateId");
      const res = await SubmitRound5Result(
        items,
        ratings,
        comments,
        inputForR4,
        totalRatings,
        r5Titles,
        ratingsR5,
        inputForR5,
        id,
        8107
      );
      console.log("handleSubmit r3 final ====>", res);
      sessionStorage.clear();
      const res2 = await submitRound("round5", id, 8100);
      navigate("/roundFinal");
    } catch (err) {
      console.log("handleSubmit ===>", err);
    }
  };

  const handleR5Titles = async () => {
    try {
      let id = sessionStorage.getItem("candidateId");
      const res = await candidateSkillsForExpertRound(id, 8107);
      // const res = ["Java", "Javascript"];
      console.log("handleR5Titles ==>", res);
      setR5Titles([...res]);
      setRatingsR5(Array(res.length).fill(0));
      setinputForR5(Array(res.length).fill(""));
    } catch (err) {
      console.log("handleR5Titles ==>", err);
    }
  };

  useEffect(() => {
    handleR5Titles();
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

      <Ratings
        items={items}
        handleItemClick={handleItemClick}
        ratings={ratings}
        handleRatingChange={handleRatingChange}
        handleR4Input={handleR4Input}
        selectedItem={selectedItem}
        inputForR4={inputForR4}
        totalRatings={totalRatings}
        // below are r5 details
        r5Titles={r5Titles}
        ratingsR5={ratingsR5}
        inputForR5={inputForR5}
        handleR5Input={handleR5Input}
        handleRatingChange5={handleRatingChange5}
        selectedItem5={selectedItem5}
        handleItemClick5={handleItemClick5}
      />
    </div>
  );
};

const Ratings = ({
  items,
  handleItemClick,
  ratings,
  handleRatingChange,
  handleR4Input,
  selectedItem,
  inputForR4,
  totalRatings,
  r5Titles,
  ratingsR5,
  inputForR5,
  handleR5Input,
  handleRatingChange5,
  selectedItem5,
  handleItemClick5,
}) => {
  return (
    <>
      <div className={styles.itemList}>
        <div className={styles.round4}>Round 4</div>
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
                {item?.description &&
                  item.description.map((ele, i) => (
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
                <div className={styles.eachItemInput}>
                  <input
                    type="text"
                    placeholder="Add your comments"
                    value={inputForR4[index]}
                    onChange={(e) => handleR4Input(e, index)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className={styles.totalScore}>
          <div className={styles.totalValue}>
            <div>Round 4 Total Score</div>
            <div>(average of all competencies score)</div>
          </div>
          <div>{totalRatings} ★</div>
        </div>
        <div className={`${styles.round4} ${styles.marginTop}`}>Round 5</div>
        {r5Titles.map((item, index) => (
          <div key={index} className={styles.eachItem}>
            <div
              className={`${styles.itemTitle} ${
                selectedItem5 === index ? styles.selected : ""
              }`}
              onClick={() => handleItemClick5(index)}
            >
              <span className={styles.arrow}>
                <img
                  src={"./down-arrow.svg"}
                  alt=""
                  style={{
                    transform: `${
                      selectedItem5 === index ? "rotate(180deg)" : ""
                    }`,
                  }}
                />
              </span>
              <span>{`${item}`}</span>
              <span className={styles.itemRating}>
                {Array(MAX_RATING)
                  .fill()
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.star} ${
                        i < ratingsR5[index] ? styles.filled : ""
                      }`}
                      onClick={() => handleRatingChange5(index, i + 1)}
                    >
                      ★
                    </span>
                  ))}
              </span>
            </div>
            {selectedItem5 === index && (
              <div className={styles.eachItemInput}>
                <input
                  type="text"
                  placeholder="Add your comments"
                  value={inputForR5[index]}
                  onChange={(e) => handleR5Input(e, index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
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
          <button
            onClick={() => {
              sessionStorage.clear();
              navigate("/expertHome");
            }}
          >
            Go Back
          </button>
          <button onClick={() => setViewPopUp(true)}>Submit Result</button>
        </div>
      </div>

      {viewPopUp && (
        <SubmitPopUp
          setViewPopUp={setViewPopUp}
          handleResultSubmit={handleResultSubmit}
        />
      )}
    </div>
  );
};

const SubmitPopUp = ({ setViewPopUp, handleResultSubmit }) => {
  return (
    <div className={styles.mainPopUp}>
      <div className={styles.first}>
        {/* img cross */}
        <div className={styles.second}>
          <img
            onClick={() => {
              setViewPopUp(false);
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
