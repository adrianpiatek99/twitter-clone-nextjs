import "@testing-library/jest-dom/extend-expect";
import { apiMockHandlers } from "__mocks__/handlers";
import { mockedSession } from "__mocks__/user.mock";
import { setupServer } from "msw/node";

Object.defineProperty(global, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn()
  }));

jest.mock("next/router", () => require("next-router-mock"));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

export const mockServer = setupServer(...apiMockHandlers);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockedSession, status: "authenticated" };
    })
  };
});
