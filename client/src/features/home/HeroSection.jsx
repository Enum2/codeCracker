import React from 'react';
import styles from './HeroSection.module.css';
import dashboardImg from '../../assets/dashboard.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const navigate = useNavigate();

  // Get user from Redux store
  const user = useSelector((state) => state.auth.user); // Adjust according to your state structure

  const handlePrimaryClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/codingStats'); 
    }
  };

  const handleDemoClick = () => {
    navigate('/calender'); 
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Track. Analyze. Improve <br/> Your Code Performance</h1>
        <p className={styles.subtitle}>
        Track Your Coding Progress and Contest Performance in One Place
        </p>
        <div className={styles.buttons}>
          <button className={styles.primaryBtn} onClick={handlePrimaryClick}>
            {user ? 'View Coding Stats' : 'Login'}
          </button>
          <button className={styles.secondaryBtn} onClick={handleDemoClick}>
          calender
          </button>
        </div>
        <div className={styles.imageContainer}>
          <img src={dashboardImg} alt="Code Tracking Dashboard" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
