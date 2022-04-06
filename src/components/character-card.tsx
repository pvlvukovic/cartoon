import * as React from "react";
import { Character } from "../interfaces/character";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";

type Props = {
  character: Character;
  onClick: (character: Character) => void;
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
