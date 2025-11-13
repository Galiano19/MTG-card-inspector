import "@testing-library/jest-dom";

// Mock fetch globally for tests
global.fetch = jest.fn();

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Reset fetch mock before each test
beforeEach(() => {
  fetch.mockClear();
});
