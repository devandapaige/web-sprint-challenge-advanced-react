import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
  const header = screen.getByText(/checkout form/i);
  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);
  //INPUTS:
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const address = screen.getByLabelText(/address/i);
  const city = screen.getByLabelText(/city/i);
  const state = screen.getByLabelText(/state/i);
  const zip = screen.getByLabelText(/zip/i);
  const submit = screen.getByRole("button");

  //Fire Events for sample Checkout Form:
  fireEvent.change(firstName, { target: { value: "Amanda" } });
  fireEvent.change(lastName, { target: { value: "Nelson" } });
  fireEvent.change(address, { target: "123 Main Street" });
  fireEvent.change(city, { target: { value: "Richmond" } });
  fireEvent.change(state, { target: { value: "VA" } });
  fireEvent.change(zip, { target: { value: "23220" } });
  fireEvent.click(submit);

  //Looking for "You have ordered some plants! Woo-hoo!":
  const checkoutSuccess = await screen.getByText(
    /You have ordered some plants/i
  );
  expect(checkoutSuccess).toBeInTheDocument();
});
