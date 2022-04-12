// Test to ensure CharacterCard component renders correctly
import * as React from "react";
import { render, screen } from "@testing-library/react";
import CharacterCard from "./CharacterCard";
import { ICharacter } from "../../interfaces/Character";

// Mock data
const character: ICharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  origin: {
    name: "Earth",
    url: "https://google.com",
  },
  location: {
    name: "Earth",
    url: "https://google.com",
  },
  // random image
  image: "https://picsum.photos/200/300",
  episode: [],
  url: "https://google.com",
  // random date
  created: "2020-01-01T00:00:00.000Z",
  gender: "Male",
};

test("render character card", () => {
  render(
    <CharacterCard
      character={character}
      onClick={(character) => {
        console.log(character);
      }}
    />
  );

  // image element
  const image = screen.getByAltText(character.name);

  // name element
  const name = screen.getByText(character.name);

  // status element
  const status = screen.getByText(character.status);

  // species element
  const species = screen.getByText(character.species);

  // Check if all elements exist
  expect(image).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(species).toBeInTheDocument();
});
