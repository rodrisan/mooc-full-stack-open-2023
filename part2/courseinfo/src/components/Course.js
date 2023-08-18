import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Course = ({ course }) => {
  const { name, parts } = course;
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Footer sum={totalExercises} />
    </div>
  );
};

export default Course;
