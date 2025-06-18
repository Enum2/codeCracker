import AnalyticsSection from "../features/home/AnalyticsSection";
import CodeTrackFeatures from "../features/home/CodeTrackFeatures";
import HeroSection from "../features/home/HeroSection";
import styles from "./LandingPage.module.css"

const LandingPage = () => {
  return(<div className={styles.cont}>
     <HeroSection/>
   <CodeTrackFeatures/>
   <AnalyticsSection/>
  </div>)
};

export default LandingPage;
