import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonWrapper}>
      <button onClick={() => navigate("/calendarDetails")}>Hr Screen</button>
      <button onClick={() => navigate("/expertHome")}>Expert Screen</button>
    </div>
  );
};

export default Home;
