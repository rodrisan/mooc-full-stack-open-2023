import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdote, votes }) => (
  <>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </>
);

const AnecdoteOfTheDay = ({ anecdote, votes, handleVote, handleNext }) => (
  <>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={anecdote} votes={votes} />
    <Button handleClick={handleVote} text="Vote" />
    <Button handleClick={handleNext} text="Next anecdote" />
  </>
);

const AnecdoteMostVoted = ({ anecdote, votes }) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {votes ? (
        <div>
          <p>{anecdote}</p>
          <p>Has {votes} votes</p>
        </div>
      ) : (
        <p>No votes given</p>
      )}
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVoted = Math.max(...votes);
  const mostVotedAnecdote = anecdotes[votes.indexOf(mostVoted)];

  const handleNext = () => {
    setSelected(generateRandomIndex(anecdotes));
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <>
      <AnecdoteOfTheDay
        anecdote={props.anecdotes[selected]}
        votes={votes[selected]}
        handleNext={handleNext}
        handleVote={handleVote}
      />
      <AnecdoteMostVoted anecdote={mostVotedAnecdote} votes={mostVoted} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const generateRandomIndex = (anecdotes) => {
  return Math.floor(Math.random() * anecdotes.length);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
