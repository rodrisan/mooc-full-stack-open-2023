import React from "react";
import ReactDOM from "react-dom";

import { Content } from "./components/content";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const totalExercises = part1.exercises + part2.exercises + part3.exercises;

  return (
    <div>
      <Header course={course} />
      <Content props={{ part1, part2, part3 }} />
      <Footer sum={totalExercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
