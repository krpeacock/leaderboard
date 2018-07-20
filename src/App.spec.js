import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new Adapter()
});

import App from "./App";
import Scoreboard from "./Scoreboard";

describe("general requirements", () => {
  it("Must be written in react", () => {
    // Verify the React component can be mounted
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });
  it("shouldn't crash", () => {
    // Fully mount the application
    const wrapper = mount(<App />);
    expect(wrapper.length).toEqual(1);
  });
  it("should render a form", () => {
    const wrapper = shallow(<App />);
    const form = wrapper.find("form");
    expect(form.length).toEqual(1);
  });
  it("should render a scoreboard", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Scoreboard />)).toEqual(true);
  });
});

describe("form features", () => {
  describe("rendering", () => {
    it("should include a firstName field", () => {
      const wrapper = shallow(<App />);
      const form = wrapper.children("form");
      expect(form.contains(<input type="text" id="firstName" />)).toEqual(true);
    });
    it("should include a lastName field", () => {
      const wrapper = shallow(<App />);
      const form = wrapper.children("form");
      expect(form.contains(<input type="text" id="lastName" />)).toEqual(true);
    });
    it("should include a score field", () => {
      const wrapper = shallow(<App />);
      const form = wrapper.children("form");
      expect(form.contains(<input type="text" id="score" />)).toEqual(true);
    });
    it("should have a submit button", () => {
      const wrapper = shallow(<App />);
      const form = wrapper.children("form");
      const button = wrapper.find("button");
      expect(button.length).toEqual(1);
      expect(button.text()).toEqual("submit");
    });
  });

  describe("actions", () => {
    it("should update the state when it submits", () => {});
  });

  // In a real-world scenario, we would have an integration test
  // to make sure the backend contract is stable
});
