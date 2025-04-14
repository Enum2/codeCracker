import { ResponsivePie } from "@nivo/pie";
import styles from "./PieOpt.module.css";

const PieOpt = ({ data }) => {
  // Verify data structure
  console.log("PieOpt data:", data);

  return (
    <div className={styles.container}>
      <div className={styles.pieChartContainer}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={5}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "set2" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          motionConfig="gentle"
        />
      </div>
    </div>
  );
};

export default PieOpt;
