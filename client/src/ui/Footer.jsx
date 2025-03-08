import styles from "./Footer.module.css";
import { FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href="#">FAQ</a>
          <a href="#">Support</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <div className={styles.socialIcons}>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>
      </div>
      <p className={styles.copyright}>
        © 2024 Codessy, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
