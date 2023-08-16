import React from "react";
import ReactDOM from "react-dom";

import { Content } from "./components/content";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Footer sum={totalExercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
