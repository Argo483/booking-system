import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import moment from "moment";
import App from "../App";

it("should render multiple calendar days", () => {
  const tree = renderer.create(<App></App>).toJSON();
  expect(tree).toMatchSnapshot();
});

