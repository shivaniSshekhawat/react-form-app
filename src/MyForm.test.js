import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import MyForm from "./MyForm";
import userEvent from "@testing-library/user-event";

describe("MyForm", () => {
  const items = ["male", "female", "others"];

  test("renders name input and validates", async () => {
    render(<MyForm />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();

    fireEvent.blur(nameInput);
    const nameError = await screen.findByText(/name is required/i);
    expect(nameError).toBeInTheDocument();
  });

  test("renders email input and validates", async () => {
    render(<MyForm />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    fireEvent.blur(emailInput);
    const emailError = await screen.findByText(/email is required/i);
    expect(emailError).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);
    const emailInvalidError = await screen.findByText(/invalid email address/i);
    expect(emailInvalidError).toBeInTheDocument();
  });

  test("renders gender dropdown and validates", async () => {
    render(<MyForm />);

    const genderSelect = screen.getByLabelText(/gender/i);
    expect(genderSelect).toBeInTheDocument();

    fireEvent.mouseDown(genderSelect);

    fireEvent.blur(genderSelect);
    const genderError = screen.queryByText(/gender is required/i);
    expect(genderError).not.toBeInTheDocument();

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    const maleOption = within(listbox).getByText(items[0]);
    expect(maleOption).toBeInTheDocument();
    fireEvent.click(maleOption);
    // userEvent.selectOptions(maleOption);

    expect(genderSelect).toHaveValue(items[0]);
  });

  test("renders subscription radio buttons and validates", async () => {
    render(<MyForm />);
    const freeRadio = screen.getByLabelText(/free/i);
    const premiumRadio = screen.getByLabelText(/premium/i);
    expect(freeRadio).toBeInTheDocument();
    expect(premiumRadio).toBeInTheDocument();

    fireEvent.blur(freeRadio);
    const subscriptionError = await screen.findByText(
      /subscription is required/i
    );
    expect(subscriptionError).toBeInTheDocument();

    fireEvent.click(freeRadio);
    expect(freeRadio).toBeChecked();
  });

  test("renders agree checkbox and validates", async () => {
    render(<MyForm />);
    const agreeCheckbox = screen.getByLabelText(
      /i agree to the terms and conditions/i
    );
    expect(agreeCheckbox).toBeInTheDocument();

    fireEvent.blur(agreeCheckbox);
    const agreeError = await screen.findByText(/you must agree to the terms/i);
    expect(agreeError).toBeInTheDocument();

    fireEvent.click(agreeCheckbox);
    expect(agreeCheckbox).toBeChecked();
  });

  test("submits form with valid data", async () => {
    render(<MyForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const genderSelect = screen.getByLabelText(/gender/i);
    const freeRadio = screen.getByLabelText(/free/i);
    const agreeCheckbox = screen.getByLabelText(
      /i agree to the terms and conditions/i
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: "User Name" } });
    fireEvent.change(emailInput, {
      target: { value: "UserEmail@example.com" },
    });

    fireEvent.mouseDown(genderSelect);
    const maleOption = await screen.findAllByRole("option", { name: /male/i });
    fireEvent.click(maleOption[0]);

    fireEvent.click(freeRadio);
    fireEvent.click(agreeCheckbox);

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText(/gender is required/i)).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/subscription is required/i)
      ).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/you must agree to the terms/i)
      ).not.toBeInTheDocument()
    );
  });
});
