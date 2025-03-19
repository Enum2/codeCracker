const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#f3c9b0",
          padding: "10px",
          border: "1px solid #FFB98E",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>{data.contestName}</strong>
        </p>
        <p>Date: {new Date(data.date * 1000).toLocaleDateString()}</p>
        <p>
          Rating: <strong>{data.rating.toFixed(2)}</strong>
        </p>
      </div>
    );
  }
  return null;
};
