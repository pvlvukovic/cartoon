import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ICharacter } from "../../interfaces/Character";

type Props = {
  character: ICharacter;
  onClick: (character: ICharacter) => void;
};

const CharacterCard: React.FC<Props> = ({ character, onClick }: Props) => {
  return (
    <Card>
      <CardActionArea onClick={() => onClick(character)}>
        <CardMedia
          component="img"
          height="140"
          image={character.image}
          alt={character.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {character.name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Status:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {character.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                Species:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {character.species}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;
