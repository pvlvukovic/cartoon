import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import {
  Character,
  CharacterInfo,
  CharacterParams,
} from "../../interfaces/characters.interface";
import { Info } from "../../interfaces/info.interface";
import CharacterCard from "./card.component";
import { characterService } from "../../services/characters.service";
import Status from "./status.component";
import CircularProgress from "@mui/material/CircularProgress";
import Search from "../../components/search.component";
import { useSearchParams } from "react-router-dom";
import useScroll from "../../hooks/scroll.hook";
import CharacterModal from "./modal.component";

const Characters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [info, setInfo] = React.useState<Info>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const isAtBottom: boolean = useScroll();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [selectedCharacter, setSelectedCharacter] = React.useState<
    Character | undefined
  >(undefined);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleFilterChange = (value: string): void => {
    setPage(1);
    setSearchParams({
      name: searchParams.get("name") || "",
      status: value,
    });
  };

  const handleSearch = (value: string): void => {
    setPage(1);
    setSearchParams({
      name: value,
      status: searchParams.get("status") || "",
    });
  };

  // Detect scroll to bottom
  React.useEffect(() => {
    if (isAtBottom && !loading && info.next) {
      setPage((prev: number) => prev + 1);
    }
  }, [isAtBottom, loading, info.next]);

  React.useEffect(() => {
    // Call API when searchParams change
    const params: CharacterParams = {
      page: page,
      name: searchParams.get("name") || "",
      status: searchParams.get("status") || "",
    };

    setLoading(true);
    characterService
      .getAll(params)
      .then((response: CharacterInfo) => {
        if (page === 1) {
          setCharacters(response.results);
        } else {
          setCharacters((prev: Character[]) => [...prev, ...response.results]);
        }
        setInfo(response.info);
        setErrorMessage("");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setErrorMessage("No results found");
        } else {
          setErrorMessage("Something went wrong");
        }
        setCharacters([]);
        setInfo({
          count: 0,
          pages: 0,
          next: "",
          prev: "",
        });
        setLoading(false);
      });
  }, [searchParams, page]);

  // Show modal when there is a selected character
  React.useEffect(() => {
    if (selectedCharacter) {
      setShowModal(true);
    }
  }, [selectedCharacter]);

  const handleCloseModal = (): void => {
    setShowModal(false);
    // Reset selected character after small delay to avoid flickering
    setTimeout(() => {
      setSelectedCharacter(undefined);
    }, 100);
  };

  return (
    <Box p={2}>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={6}>
          <Status
            onChange={handleFilterChange}
            value={searchParams.get("status") || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Search
            onSearch={handleSearch}
            value={searchParams.get("name") || ""}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={character.id}>
            <CharacterCard
              onClick={() => setSelectedCharacter(character)}
              character={character}
            />
          </Grid>
        ))}
      </Grid>

      {!!errorMessage && (
        <Box m={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="caption" color="textSecondary">
            😞 {errorMessage}
          </Typography>
        </Box>
      )}

      {!info.next && !errorMessage && characters.length > 0 && (
        <Box m={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="caption" color="textSecondary">
            That's all folks! 🎉
          </Typography>
        </Box>
      )}

      {loading && (
        <Box m={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      <CharacterModal
        character={selectedCharacter}
        onClose={handleCloseModal}
        open={showModal}
      />
    </Box>
  );
};

export default Characters;
