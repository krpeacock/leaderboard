import React from "react";
import Scoreboard from "./Scoreboard";
import arraySort from "array-sort";

export const sortPlayers = players => {
  return arraySort(players, ["score", "lastName"]);
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: JSON.parse(sessionStorage.getItem("players")) || []
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { players, firstName, lastName, score } = this.state;
    const sortedPlayers = sortPlayers([
      ...this.state.players,
      { firstName, lastName, score }
    ]);
    this.setState(
      {
        players: sortedPlayers,
        firstName: "",
        lastName: "",
        score: 0
      },
      () => {
        sessionStorage.setItem("players", JSON.stringify(this.state.players));
        // Code to update server goes here
      }
    );
  }
  handleChange(e) {
    e.preventDefault();
    let { id, value } = e.target;

    // only allow numbers
    if (id === "score") {
      var reg = /^\d+$/;
      if (!reg.test(value) && value !== "") {
        // The perfect UX solution
        return alert("only use numbers!");
      }
      value = +value;
      if (value > 100) {
        return alert("the score only goes to 100!");
      }
    }
    this.setState({ [id]: value });
  }

  deletePlayer(index) {
    const remainingPlayers = this.state.players.filter((player, idx) => {
      return index !== idx;
    });
    this.setState({ players: remainingPlayers }, () => {
      sessionStorage.setItem("players", JSON.stringify(this.state.players));
      // Code to update server goes here
    });
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const deletePlayer = this.deletePlayer.bind(this);
    return (
      <div>
        <Scoreboard players={this.state.players} deletePlayer={deletePlayer} />
        <form id="leaderboard-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName" onChange={handleChange}>
            First Name
            <input type="text" id="firstName" value={this.state.firstName} />
          </label>
          <label htmlFor="lastName" onChange={handleChange}>
            Last Name
            <input type="text" id="lastName" value={this.state.lastName} />
          </label>
          <label htmlFor="score" onChange={handleChange}>
            Score
            <input type="text" id="score" value={this.state.score} />
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
