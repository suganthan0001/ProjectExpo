import React from 'react';
import "./PieChart.css"

const PieChart = ({ data }) => {
  // Calculate the total value of all segments
  const totalValue = data.reduce((acc, segment) => acc + segment.value, 0);

  // Calculate the angle for each segment
  let startAngle = -90; // Start at the top
  const segments = data.map((segment) => {
    const angle = (segment.value / totalValue) * 360; // Calculate the angle
    const style = {
      transform: `rotate(${startAngle}deg)`,
      backgroundColor: segment.color,
      clipPath: 'polygon(50% 50%, 50% 0, 100% 0)',
    };
    startAngle += angle; // Update startAngle for the next segment
    return <div className="segment" style={style} />;
  });

  return <div className="pie">{segments}</div>;
};

export default PieChart;
