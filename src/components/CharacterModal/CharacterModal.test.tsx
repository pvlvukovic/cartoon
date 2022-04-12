// Test to ensure CharacterModal component renders correctly
import * as React from "react";
import { render, screen } from "@testing-library/react";
import CharacterModal from "./CharacterModal";
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
  episode: ["https://google.com", "https://google.com"],
  url: "https://google.com",
  // random date
  created: "2020-01-01T00:00:00.000Z",
  gender: "Male",
};

test("render character card", () => {
  render(
    <CharacterModal character={character} open={true} onClose={() => null} />
  );

  // image element
  const image = screen.getByAltText(character.name);

  // name element
  const name = screen.getByText(character.name);

  // status element
  const status = screen.getByText(character.status);

  // species element
  const species = screen.getByText(`Species: ${character.species}`);

  // gender element
  const gender = screen.getByText(`Gender: ${character.gender}`);

  // type element
  const type = screen.getByText(`Type: ${character.type || "/"}`);

  // origin element
  const origin = screen.getByText(`Origin: ${character.origin.name}`);

  // last location element
  const location = screen.getByText(
    `Last location: ${character.location.name}`
  );

  // episodes length element
  const episodes = screen.getByText(`Episodes: ${character.episode.length}`);

  // Check if all elements exist
  expect(image).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(species).toBeInTheDocument();
  expect(gender).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(origin).toBeInTheDocument();
  expect(location).toBeInTheDocument();
  expect(episodes).toBeInTheDocument();
});

test("close button closes modal", () => {
  const onClose = jest.fn();
  render(
    <CharacterModal character={character} open={true} onClose={onClose} />
  );

  // close button
  const closeButton = screen.getByRole("button");

  // click close button
  closeButton.click();

  // check if onClose was called
  expect(onClose).toHaveBeenCalled();
});
