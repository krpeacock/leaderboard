import React from "react";
import Scoreboard from "./Scoreboard";

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
    this.setState(
      {
        players: [...this.state.players, { firstName, lastName, score }],
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
    }
    this.setState({ [id]: value });
  }

  render() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    return (
      <div>
        <Scoreboard players={this.state.players} />
        <form id="leaderboard-form" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName" onChange={this.handleChange}>
            First Name
            <input type="text" id="firstName" value={this.state.firstName} />
          </label>
          <label htmlFor="lastName" onChange={this.handleChange}>
            Last Name
            <input type="text" id="lastName" value={this.state.lastName} />
          </label>
          <label htmlFor="score" onChange={this.handleChange}>
            Score
            <input type="text" id="score" value={this.state.score} />
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
