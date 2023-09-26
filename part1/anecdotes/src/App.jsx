import { useState } from 'react'

const Display = (props) => <h2>{props.text}</h2>;

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Anecdote = (props) => {
  return (
    <>
      {props.anecdote}
      <br />
      has {props.votes} vote(s)
    </>
  );
};

const MostVoted = (props) => {
  return (
    <>
      <Display text="Anecdote with Most Votes" />
      {!props.hasVotes && <>No anecdotes have been voted on yet.</>}
      {props.hasVotes && (
        <Anecdote anecdote={props.anecdote} votes={props.votes} />
      )}
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]   
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [hasVotes, setHasVotes] = useState(false);

  const getRandomIdx = (length) => {
    return Math.floor(Math.random() * length);
  };

  const setNewRandomAnecdote = () => {
    let randomAnecdoteIdx;

    do {
      randomAnecdoteIdx = getRandomIdx(anecdotes.length);
    } while (randomAnecdoteIdx === selected);

    setSelected(randomAnecdoteIdx);
  };

  const incrementVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setHasVotes(true);
  };

  const handleButtonClick = (type) => {
    switch (type) {
      case "next":
        setNewRandomAnecdote();
        break;
      case "vote":
        incrementVote();
        break;
      default:
        break;
    }
  };

  const maxVote = votes.reduce(
    (acc, num, idx) => {
      if (num > acc.num) {
        acc.num = num;
        acc.idx = idx;
      }

      return acc;
    },
    { num: 0 }
  );

  const maxVotedAnecdote = anecdotes[maxVote.idx];

  return (
    <div>
      <Display text="Anecdote of the Day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button onClick={() => handleButtonClick("vote")} text="vote" />
      <Button onClick={() => handleButtonClick("next")} text="next anecdote" />
      <MostVoted
        hasVotes={hasVotes}
        anecdote={maxVotedAnecdote}
        votes={maxVote.num}
      />
    </div>
  )
}

export default App