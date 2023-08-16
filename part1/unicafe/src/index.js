import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ handleClick, text }) => {
  /* Already done */
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ props }) => {
  const { good, neutral, bad, total, average, positive } = props;
  return (
    <table>
      <thead>
        <StatisticLine text={<h1>Statistics</h1>} value={""} />
      </thead>
      <tbody>
        {total ? (
          <>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={`${positive}%`} />
          </>
        ) : (
          <StatisticLine text="No feedback received" value={""} />
        )}
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const ZERO = 0;
  const [good, setGood] = useState(ZERO);
  const [neutral, setNeutral] = useState(ZERO);
  const [bad, setBad] = useState(ZERO);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  const HUNDRED = 100;
  const total = good + neutral + bad;
  const average = (good - bad) / total || ZERO;
  const positive = (good * HUNDRED) / total || ZERO;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Statistics props={{ good, neutral, bad, total, average, positive }} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
