import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import CharacterModal from "../../components/CharacterModal/CharacterModal";
import Search from "../../components/Search/Search";
import Status from "../../components/StatusFilter/StatusFilter";
import useScroll from "../../hooks/useScroll";
import {
  ICharacter,
  ICharacterInfo,
  ICharacterParams,
} from "../../interfaces/Character";
import { IInfo } from "../../interfaces/Info";
import { characterService } from "../../services/characters";

const Characters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [info, setInfo] = React.useState<IInfo>({
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
    ICharacter | undefined
  >(undefined);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleFilterChange = (value: string): void => {
    setPage(1);

    if (value) {
      searchParams.set("status", value);
    } else {
      searchParams.delete("status");
    }

    setSearchParams(searchParams);
  };

  const handleSearch = (value: string): void => {
    setPage(1);

    if (value) {
      searchParams.set("name", value);
    } else {
      searchParams.delete("name");
    }

    setSearchParams(searchParams);
  };

  // Detect scroll to bottom
  React.useEffect(() => {
    if (isAtBottom && !loading && info.next) {
      setPage((prev: number) => prev + 1);
    }
  }, [isAtBottom, loading, info.next]);

  // Fetch characters
  const fetchCharacters = React.useCallback(async (): Promise<void> => {
    setLoading(true);
    setErrorMessage("");
    try {
      const params: ICharacterParams = {
        name: searchParams.get("name") || "",
        status: searchParams.get("status") || "",
        page,
      };
      const data: ICharacterInfo = await characterService.getAll(params);

      if (page === 1) {
        setCharacters(data.results);
      } else {
        setCharacters((prev: ICharacter[]) => [...prev, ...data.results]);
      }
      setInfo(data.info);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setErrorMessage("No characters found");
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
    }
    setLoading(false);
  }, [searchParams, page]);

  // Call API when searchParams change
  React.useEffect(() => {
    fetchCharacters();
  }, [searchParams, page, fetchCharacters]);

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
    <Box pt={4}>
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

      <Box
        m={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!!errorMessage && (
          <Typography variant="caption" color="textSecondary">
            😞 {errorMessage}
          </Typography>
        )}

        {!info.next && !errorMessage && characters.length > 0 && (
          <Typography variant="caption" color="textSecondary">
            That's all folks! 🎉
          </Typography>
        )}

        {loading && (
          <Typography variant="caption" color="textSecondary">
            Loading...
          </Typography>
        )}
      </Box>

      <CharacterModal
        character={selectedCharacter}
        onClose={handleCloseModal}
        open={showModal}
      />
    </Box>
  );
};

export default Characters;
