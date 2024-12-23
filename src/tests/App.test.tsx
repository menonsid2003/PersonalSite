import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';

describe("<App />", () => {
  test("App mounts properly", () => {
    render(<App />);
    expect(screen.getByAltText("Spotlight")).toBeInTheDocument();
  });

  test("Navbar component is rendered", () => {
    render(<App />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("Card component is rendered", () => {
    render(<App />);
    expect(screen.getByTestId("card-component")).toBeInTheDocument();
  });

  test("MusicPlayer component is rendered", () => {
    render(<App />);
    expect(screen.getByTestId("musicplayer-component")).toBeInTheDocument();
  });
});
