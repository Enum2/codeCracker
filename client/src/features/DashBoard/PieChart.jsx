import { ResponsivePie } from "@nivo/pie";
import styles from "./PieChart.module.css";

const PieChart = ({ data }) => {
  return (
    <div className={styles.pie}>
      {/* Pie Chart */}
      <div className={styles.pieChart}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 10, bottom: 80, left: 30 }}
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
        />
      </div>

      {/* Scrollable Legend */}
      <div className={styles.legendContainer}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: "50%",
                marginRight: 8,
              }}
            ></div>
            <span style={{ fontSize: "14px", color: "#333" }}>
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
