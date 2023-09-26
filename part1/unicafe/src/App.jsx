import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>;

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;


const Statistics = (props) => {
  const noFeedback="No feedback given";
  console.log(props.hasFeedback)
  if (!props.hasFeedback) {
    return <p>{noFeedback}</p>;
  }
  
   return (
   <div>
    <table>
        <tbody>
    <StatisticLine  text="good" value={props.good} />
    <StatisticLine  text="neutral" value={props.neutral} />
    <StatisticLine  text="bad" value={props.bad} />
    <StatisticLine  text="all" value={props.all} />
    <StatisticLine  text="average" value={props.average} />
    <StatisticLine  text= "positive" value={props.percPositive + " %"} />
      </tbody>
    </table>
   </div>
   )
  
}

const StatisticLine  =(props)=> { 
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
); 
}


const App = () => {
  const value ="give feedback"
  const statistics ="statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [hasFeedback, setHasFeedback] = useState(false);

  const total = good + neutral + bad;

  const getPercent = (x, sum) => {
    let result = (x / sum) * 100;

    if (Number.isNaN(result)) return 0;

    return Math.round(result * 10) / 10;
  };

  const percentPositive = getPercent(good, total);

  const getWeightedAvg = (weightsArr, total) => {
    const weights = weightsArr.reduce((acc, item) => {
      return acc + item.number * item.weight;
    }, 0);

    let result = weights / total;

    if (Number.isNaN(result)) return 0;

    return Math.round(result * 10) / 10;
  };

  const averageScore = getWeightedAvg(
    [
      { number: good, weight: 1 },
      { number: neutral, weight: 0 },
      { number: bad, weight: -1 },
    ],
    total
  );

  const handleButtonClick = (type) => {
    setHasFeedback(true);

    switch (type) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const statisticsProps = {
    hasFeedback: hasFeedback,
    good: good,
    neutral: neutral,
    bad: bad,
    all: total,
    average: averageScore,
    percPositive: percentPositive,
  };
  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => handleButtonClick("good")} text="good" />
      <Button handleClick={() => handleButtonClick("neutral")} text="neutral" />
      <Button handleClick={() => handleButtonClick("bad")} text="bad" />
      <Display value={statistics} />
      <Statistics {...statisticsProps} />     
    </div>
  )
}

export default App