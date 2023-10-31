import ProgressBar from "react-progressbar";

const savingsStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

 const Stats = ({total, goal}) => {
    return(
        <div style={{ textAlign: "center" }}>
        <h2 style={savingsStyle}>Current savings: ${total.toFixed(2)}</h2>
        <div className="centered-progress-container">
          <div>
            <p>Savings Goal Progress </p>
          </div>
          <div className="limited-progress-bar">
            <ProgressBar completed={(total / goal) * 100} />
          </div>
          <div>
            <p>
              {Math.floor((total / goal) * 100)}%{" "}
              <i>
                (${total.toFixed(2)}/${goal})
              </i>
            </p>
          </div>
        </div>
      </div>
    )
}

export default Stats;