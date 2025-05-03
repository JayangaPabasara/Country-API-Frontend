import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

const renderLogin = () =>
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

describe("LoginPage", () => {
  it("renders login input and button", () => {
    renderLogin();
    expect(
      screen.getByPlaceholderText(/enter your username/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("logs in user successfully", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Login successful",
        token: "mockToken",
        name: "Jayanga",
      },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "Jayanga" },
    });

    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("mockToken");
      expect(localStorage.getItem("username")).toBe("Jayanga");
    });
  });

  it("shows error message on login failure", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Invalid username" } },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "wronguser" },
    });

    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() =>
      expect(screen.getByText(/invalid username/i)).toBeInTheDocument()
    );
  });
});
