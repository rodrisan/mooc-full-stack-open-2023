import React from "react";
import ReactDOM from "react-dom";

import { Content } from "./components/content";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const totalExercises = course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer sum={totalExercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
