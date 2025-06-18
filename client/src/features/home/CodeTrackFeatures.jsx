import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./CodeTrackFeatures.module.css";
import statsImg from "../../assets/stats.png";

const CodeTrackFeatures = () => {
  const user = useSelector((state) => state.auth?.user); 
  const navigate = useNavigate();

  const handleTryNow = () => {
    if (user) {
      navigate("/codingStats");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMore = () => {
    navigate("/");
  };

  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.heading}>Your Coding Journey, Visualized</h2>
      <p className={styles.subheading}>
        Explore the powerful capabilities of CodeTrack, designed to enhance your
        coding productivity and streamline your workflow.
      </p>

      <div className={styles.featureBlock}>
        <div className={styles.textContent}>
          <h3 className={styles.featureTitle}>
            Powerful Insights for Competitive Coders
          </h3>
          <p className={styles.featureDescription}>
            Collaborate with team members on the same codebase, ensuring seamless integration and instant feedback.
          </p>
          <div className={styles.buttons}>
            <button className={styles.tryNow} onClick={handleTryNow}>
              {user ? "View Coding Stats" : "Login"}
            </button>
            <button className={styles.learnMore} onClick={handleLearnMore}>
              Learn more
            </button>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={statsImg} alt="Collaboration stats" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default CodeTrackFeatures;
