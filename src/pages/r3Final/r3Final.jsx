import { useNavigate } from "react-router-dom";
import styles from "./r3Final.module.css";

const R3Final = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.title}>Congratulations!</div>
        <div className={styles.desc}>
          Your test results have been successfully submitted.
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => navigate("/")}>Go to Submissions</button>
          <button onClick={() => navigate("/")}>Back to Homepage</button>
        </div>
      </div>
    </div>
  );
};

export default R3Final;
