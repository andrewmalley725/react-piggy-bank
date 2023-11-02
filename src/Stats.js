import ProgressBar from "react-progressbar";

const savingsStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const Stats = ({ total, goal }) => {
  const percent = goal === 0 ? 0 : Math.floor((total / goal) * 100);
  const completed = percent > 100 ? 100 : percent; // add this line
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={savingsStyle}>Current savings: ${total.toFixed(2)}</h2>
      <div className="centered-progress-container">
        <div>
          <p>Savings Goal Progress </p>
        </div>
        <div className="limited-progress-bar">
          <ProgressBar completed={completed} /> {/* modify this line */}
        </div>
        <div>
          <p>
            {percent}% <i>(${total.toFixed(2)}/${goal})</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;