import { CloseOutlined } from "@mui/icons-material";
import { Avatar, Box, Dialog, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { ICharacter } from "../../interfaces/Character";

type Props = {
  character?: ICharacter;
  onClose: () => void;
  open: boolean;
};

const CharacterModal: React.FC<Props> = ({
  character,
  onClose,
  open,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} keepMounted={true}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <CloseOutlined />
        </IconButton>
      </Box>
      <Box p={2} pt={0}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={character?.image}
            alt={character?.name}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box ml={2}>
            <Typography variant="h6">{character?.name}</Typography>
            <Typography variant="caption">{character?.status}</Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">Gender: {character?.gender}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">Species: {character?.species}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">
            Type: {character?.type || "/"}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">
            Origin: {character?.origin.name}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">
            Last location: {character?.location.name}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">
            Episodes: {character?.episode.length}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CharacterModal;
