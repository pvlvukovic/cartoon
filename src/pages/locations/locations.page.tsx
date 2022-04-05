import * as React from "react";
import {
  Location,
  LocationInfo,
  LocationParams,
} from "../../interfaces/locations.interface";
import { useSearchParams } from "react-router-dom";
import { Info } from "../../interfaces/info.interface";
import { locationService } from "../../services/locations.service";
import { characterService } from "../../services/characters.service";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Search from "../../components/search.component";
import { Character } from "../../interfaces/characters.interface";

const LocationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [info, setInfo] = React.useState<Info>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingResidents, setLoadingResidents] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [selectedLocation, setSelectedLocation] = React.useState<
    Location | undefined
  >(undefined);

  const handleSearch = (value: string): void => {
    setSearchParams({
      name: value,
      page: searchParams.get("page") || "1",
    });
  };

  // Call API when searchParams change
  React.useEffect(() => {
    const params: LocationParams = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || "1",
    };

    setLoading(true);
    setErrorMessage("");
    locationService
      .getAll(params)
      .then((response: LocationInfo) => {
        setLocations(response.results);
        setInfo(response.info);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  // Call API when selectedLocation change to get characters
  React.useEffect(() => {
    if (selectedLocation) {
      setLoadingResidents(true);

      // Get ids from location.residents
      const ids: string[] = selectedLocation.residents.map((resident) => {
        return resident.split("/")[5];
      });

      characterService
        .getMultiple(ids)
        .then((response: Character[]) => {
          if (response.length > 0) {
            setCharacters(response);
          }
        })
        .catch((error) => {
          // TODO: Handle error
        })
        .finally(() => {
          setLoadingResidents(false);
        });
    }
  }, [selectedLocation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box py={4}>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12}>
          <Search
            onSearch={handleSearch}
            value={searchParams.get("name") || ""}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Locations</Typography>
              </TableCell>
              <TableCell align="right" colSpan={4}>
                <Typography variant="h6">
                  {info.count}
                  {info.count === 1 ? " location" : " locations"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location: Location) => (
              <React.Fragment>
                <TableRow
                  key={location.id}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                >
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        if (selectedLocation?.id === location.id) {
                          setSelectedLocation(undefined);
                        } else {
                          setSelectedLocation(location);
                        }
                      }}
                    >
                      {selectedLocation &&
                      selectedLocation.id === location.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant="body1">{location.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">{location.type}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {location.dimension}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      <a href={location.url}>Visit</a>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse
                      in={
                        selectedLocation && selectedLocation.id === location.id
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography variant="body2">Residents</Typography>
                      </Box>

                      {loadingResidents ? (
                        <Box margin={1}>
                          <Typography variant="body2">
                            Loading residents...
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          margin={1}
                          // Make them spread to the next line
                          sx={{
                            "& > *": {
                              display: "inline-block",
                              marginRight: "1rem",
                            },
                          }}
                        >
                          {characters.map((character: Character) => (
                            <Box key={character.id}>
                              <Avatar src={character.image} />
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={info.count}
                rowsPerPage={19}
                page={parseInt(searchParams.get("page") || "1", 10) - 1}
                onPageChange={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
                  page: number
                ) => {
                  setSearchParams({
                    name: searchParams.get("name") || "",
                    page: (page + 1).toString(),
                  });
                }}
                onRowsPerPageChange={(
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  setSearchParams({
                    name: searchParams.get("name") || "",
                    page: "1",
                  });
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LocationsPage;
