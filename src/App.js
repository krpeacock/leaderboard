import React, { Fragment } from "react";
import Scoreboard from "./Scoreboard";
import {
  sortPlayers,
  capitalizeFirstLetter,
  parseSessionStorage,
  setSessionStorage
} from "./helpers";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: parseSessionStorage(),
      firstName: "",
      lastName: "",
      score: 0,
      addingPlayer: false
    };
  }

  /* 
    Re-using one form to edit or add players
    I got fairly far in before realizing that editing was a requirement,
    otherwise I probably would have used two separate forms.
  */

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

    if (!firstName || !lastName) return alert("Please fill out all fields");

    let sortedPlayers;
    if (addingPlayer) {
      sortedPlayers = sortPlayers([
        ...this.state.players,
        { firstName, lastName, score }
      ]);
    } else {
      const playerToEdit = players[editPlayerIndex];
      return this.editPlayer(editPlayerIndex, {
        firstName,
        lastName,
        score
      });
    }
    this.updatePlayers(sortedPlayers);
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

  /*  
    We are only using index because this is a simple data model,
    held in Memory. A production version would use unique id's, managed 
    by the server 
  */
  editPlayer(index, updatedPlayer) {
    let players = [...this.state.players];
    players.splice(index, 1, updatedPlayer);
    this.updatePlayers(sortPlayers(players));
  }

  deletePlayer(index) {
    const remainingPlayers = this.state.players.filter((player, idx) => {
      return index !== idx;
    });
    this.updatePlayers(remainingPlayers);
  }

  updatePlayers(sortedPlayers) {
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
        setSessionStorage(this.state.players);
        // Code to update server goes here
      }
    );
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
    const handleChange = this.handleChange.bind(this),
      handleSubmit = this.handleSubmit.bind(this),
      toggleAddPlayer = this.toggleAddPlayer.bind(this),
      deletePlayer = this.deletePlayer.bind(this),
      toggleEditingPlayer = this.toggleEditingPlayer.bind(this);

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
        {/* In a production scenario, this form would likely be a higher-order
         component that uses the React Context to control its inputs */}
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
