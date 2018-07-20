import React from "react";

export default class Scoreboard extends React.Component {
  mapPlayers() {
    const { players } = this.props;
    return players.map((player, idx) => {
      const { lastName, firstName, score } = player;
      return (
        <tr key={idx}>
          <td>{`${lastName}, ${firstName}`}</td>
          <td>{`${score}`}</td>
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
