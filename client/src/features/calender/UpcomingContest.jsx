import React from "react";
import styles from "./UpcomingContests.module.css";

const sampleContests = [
  { title: "AtCoder Beginner Contest 400", date: "2025-04-05", link: "#" },
  { title: "Teza Round 1 (Div. 1)", date: "2025-04-05", link: "#" },
  { title: "Weekly Contest 444", date: "2025-04-06", link: "#" },
  { title: "GFG Weekly - 201", date: "2025-04-06", link: "#" },
  { title: "Codeforces Round 879", date: "2025-04-12", link: "#" },
];

const UpcomingContests = () => {
  return (
    <div className={styles.upcomingContests}>
      <h2>Upcoming Contests</h2>
      {sampleContests.map((event, index) => (
        <div key={index} className={styles.contestCard}>
          <p className={styles.contestDate}>
            {new Date(event.date).toDateString()}
          </p>
          <p className={styles.contestTitle}>{event.title}</p>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.calendarLink}
          >
            Add to Calendar
          </a>
        </div>
      ))}
    </div>
  );
};

export default UpcomingContests;
