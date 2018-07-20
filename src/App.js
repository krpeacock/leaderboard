import React from "react";
import Scoreboard from "./Scoreboard";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Scoreboard />
        <form id="leaderboard-form">
          <label for="firstName">
            First Name
            <input type="text" id="firstName" />
          </label>
          <label for="lastName">
            Last Name
            <input type="text" id="lastName" />
          </label>
          <label for="score">
            Score
            <input type="text" id="score" />
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
