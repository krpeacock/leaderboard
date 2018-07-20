import React, { Fragment } from "react";
import Scoreboard from "./Scoreboard";
import arraySort from "array-sort";

export const sortPlayers = players => {
  return arraySort(players, ["score", "lastName"]);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const parseSessionStorage = () => {
  let parsed;
  if (sessionStorage.getItem("players") === "undefined") {
    sessionStorage.removeItem("players");
  } else {
    parsed = JSON.parse(sessionStorage.getItem("players"));
  }
  if (Array.isArray(parsed)) return parsed;
  return [];
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: parseSessionStorage(),
      addingPlayer: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      players,
      firstName,
      lastName,
      score,
      addingPlayer,
      editPlayerIndex
    } = this.state;
    let sortedPlayers;
    if (addingPlayer) {
      sortedPlayers = sortPlayers([
        ...this.state.players,
        { firstName, lastName, score }
      ]);
    } else {
      const playerToEdit = players[editPlayerIndex];
      sortedPlayers = this.editPlayer(editPlayerIndex, {
        firstName,
        lastName,
        score
      });
    }
    this.setState(
      {
        players: sortedPlayers,
        firstName: "",
        lastName: "",
        score: 0,
        addingPlayer: false,
        editingPlayer: false,
        editPlayerIndex: null
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
    } else {
      value = capitalizeFirstLetter(value);
    }
    this.setState({ [id]: value });
  }

  editPlayer(index, updatedPlayer) {
    let players = [...this.state.players];
    players.splice(index, 1, updatedPlayer);
    return sortPlayers(players);
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
  toggleAddPlayer() {
    this.setState({ addingPlayer: !this.state.addingPlayer });
  }
  toggleEditingPlayer(editPlayerIndex) {
    let playerToEdit = this.state.players[editPlayerIndex];
    let { firstName, lastName, score } = playerToEdit;
    this.setState({
      editingPlayer: !this.state.editingPlayer,
      editPlayerIndex,
      firstName,
      lastName,
      score
    });
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const toggleAddPlayer = this.toggleAddPlayer.bind(this);
    const deletePlayer = this.deletePlayer.bind(this);
    const toggleEditingPlayer = this.toggleEditingPlayer.bind(this);
    const {
      players,
      addingPlayer,
      editingPlayer,
      firstName,
      lastName,
      score
    } = this.state;
    return (
      <div>
        <h1>Leaderboard</h1>
        <Scoreboard
          players={players}
          deletePlayer={deletePlayer}
          addingPlayer={addingPlayer}
          toggleEditingPlayer={toggleEditingPlayer}
        />
        {addingPlayer || editingPlayer ? (
          <h3>{addingPlayer ? "Add a score" : "Update a score"}</h3>
        ) : null}
        {addingPlayer || editingPlayer ? (
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
        ) : null}
        <button onClick={toggleAddPlayer} disabled={editingPlayer}>
          {addingPlayer ? "Cancel" : "Add player"}
        </button>
      </div>
    );
  }
}
