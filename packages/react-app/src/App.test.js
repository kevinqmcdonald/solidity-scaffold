import React from "react";
import {render, waitFor} from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(() => ({
    pathname: ""
  }))
}));

const RequiredProviders = ({ children }) => {
  return (
    <ThemeSwitcherProvider themeMap={{}}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </ThemeSwitcherProvider>
  )
}

const createWrapper = () => {
  return render(<App />, {
    wrapper: RequiredProviders
  })
}

describe("<App />", () => {
  it("should mount", async () => {
    const { getByTestId } = createWrapper();
    const linkElement = getByTestId("App");
    await waitFor(() => {
      expect(linkElement).toBeInTheDocument();
    })
  });
})
