import React from "react";

export default class Scoreboard extends React.Component {
  mapPlayers() {
    const { players, deletePlayer } = this.props;
    return players.map((player, index) => {
      const { lastName, firstName, score } = player;
      return (
        <tr key={index}>
          <td>{`${lastName}, ${firstName}`}</td>
          <td>{`${score}`}</td>
          <td>
            <button onClick={() => deletePlayer(index)}>delete</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { players } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th />
          </tr>
        </thead>
        <tbody>{players ? this.mapPlayers() : null}</tbody>
      </table>
    );
  }
}
