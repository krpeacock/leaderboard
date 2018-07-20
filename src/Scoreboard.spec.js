import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new Adapter()
});

import Scoreboard from "./Scoreboard";
const samplePlayers = [
  {
    firstName: "Alice",
    lastName: "Geary",
    score: 96
  },
  {
    firstName: "John",
    lastName: "Junge",
    score: 96
  },
  {
    firstName: "Rob",
    lastName: "Vera",
    score: 88
  }
];

describe("scoreboard requirements", () => {
  it("should render successfully", () => {
    const wrapper = shallow(<Scoreboard />);
    expect(wrapper.length).toEqual(1);
  });

  it("should render a list of players", () => {
    const wrapper = shallow(<Scoreboard players={[samplePlayers[0]]} />);
    expect(wrapper.text().indexOf("Geary, Alice") > 1).toEqual(true);
  });

  it("should have a delete button for every record", () => {});
});
