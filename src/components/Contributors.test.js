/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import Contributors from "./Contributors";
import React from "react";
import "@testing-library/jest-dom";

// mocking the fetch method
// https://www.leighhalliday.com/mock-fetch-jest
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        records: [
          {
            id: 1,
            fields: {
              emoji: "🧑",
              Name: "John Doe",
              "Contribution Type": "testing",
              "GitHub/Social": "@JohnDoe",
              "Favorite Sea Animal": "sea animal",
            },
          },
        ],
      }),
  });
});

async function fetchFromAPI() {
  const apiKey =
    "patZqW6kq6eJpR1rr.af975adfba875ba01c385ff086a6712767221ea337eac18af43624d004685335";
  const baseId = "appnTJyNgaBLsKObm";
  const tableName = "Contributors";

  return await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((res) => res.json());
}

describe("Contributors", () => {
  describe("API endpoint", () => {
    test("respond with an array", async () => {
      const data = await fetchFromAPI(); // fetch is replaced by mock function

      expect(Array.isArray(data.records)).toBeTruthy();
    });

    test("should be an array of objects", async () => {
      const data = await fetchFromAPI();

      expect(data.records.length).toBe(1);
    });
    test("should contain the correct data", async () => {
      const data = await fetchFromAPI();
      expect(data.records[0]).toEqual({
        id: 1,
        fields: {
          emoji: "🧑",
          Name: "John Doe",
          "Contribution Type": "testing",
          "GitHub/Social": "@JohnDoe",
          "Favorite Sea Animal": "sea animal",
        },
      });
    });
  });

  describe("Frontend UI", () => {
    test("should include a title named Contributors", async () => {
      render(<Contributors />);

      const heading = await screen.findByRole("heading", {
        name: /contributors/i,
      });
    });
    test("should display a name", async () => {
      render(<Contributors />);

      const name = await screen.findByRole("heading", {
        name: /contributor-name/i,
      });

      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent(/john doe/i);
    });
    test("should display a contribution", async () => {
      render(<Contributors />);

      const contributionType = await screen.findByTestId("contributor-type");

      expect(contributionType).toBeInTheDocument();
      expect(contributionType).toHaveTextContent("testing");
    });

    test("should display a favourite sea animal", async () => {
      render(<Contributors />);

      const favouriteSeaAnimal = await screen.findByTestId(
        "contributor-favorite-sea-animal"
      );

      expect(favouriteSeaAnimal).toBeInTheDocument();
      expect(favouriteSeaAnimal).toHaveTextContent("sea animal");
    });
    test("should display social", async () => {
      render(<Contributors />);

      const social = await screen.findByTestId("contributor-socials");

      expect(social).toBeInTheDocument();
      expect(social).toHaveTextContent("@JohnDoe");
    });
    test("should display a emoji", async () => {
      render(<Contributors />);

      const emoji = await screen.findByTestId("contributor-emoji");

      expect(emoji).toBeInTheDocument();
      expect(emoji).toHaveTextContent("🧑");
    });
  });
});
