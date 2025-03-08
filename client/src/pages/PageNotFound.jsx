import React from "react";
import styles from "./PageNotFound.module.css";
import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <main className={styles.pageNotFound}>
      <div className={styles.box}>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; 4O4
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
