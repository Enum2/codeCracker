import React from "react";
import styles from "./Heading.module.css";

function Heading({ as: Tag = "h1", children }) {
  let className = styles.h1; // Default class

  if (Tag === "h2") className = styles.h2;
  if (Tag === "h3") className = styles.h3;

  return <Tag className={className}>{children}</Tag>;
}

export default Heading;
