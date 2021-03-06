import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import { ICharacter } from "../../interfaces/Character";
import { IInfo } from "../../interfaces/Info";
import {
  ILocation,
  ILocationInfo,
  ILocationParams,
} from "../../interfaces/Location";
import { characterService } from "../../services/characters";
import { locationService } from "../../services/locations";

const LocationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = React.useState<ILocation[]>([]);
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [info, setInfo] = React.useState<IInfo>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingResidents, setLoadingResidents] =
    React.useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = React.useState<
    ILocation | undefined
  >(undefined);

  const handleSearch = (value: string): void => {
    if (value) {
      searchParams.set("name", value);
    } else {
      searchParams.delete("name");
    }

    searchParams.set("page", "1");

    setSearchParams(searchParams);
  };

  // Call API when searchParams change
  React.useEffect(() => {
    const params: ILocationParams = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || "1",
    };

    setLoading(true);
    locationService
      .getAll(params)
      .then((response: ILocationInfo) => {
        setLocations(response.results);
        setInfo(response.info);
      })
      .catch(() => {
        // TODO handle error
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
        .then((response: ICharacter[]) => {
          if (response.length > 0) {
            setCharacters(response);
          }
        })
        .catch(() => {
          // TODO: Handle error
        })
        .finally(() => {
          setLoadingResidents(false);
        });
    }
  }, [selectedLocation]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" m={4}>
        <Typography variant="caption" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    );
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
            {locations.map((location: ILocation) => (
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
                      <a
                        target="_blank"
                        href={`https://www.google.com/maps/search/?api=1&query=${
                          // random latitude
                          Math.random() * (90 - -90) + -90
                        },${
                          // random longitude
                          Math.random() * (180 - -180) + -180
                        }`}
                        rel="noreferrer"
                      >
                        Visit
                      </a>
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
                          {characters.map((character: ICharacter) => (
                            <Box key={character.id}>
                              <Tooltip title={character.name}>
                                <Avatar src={character.image} />
                              </Tooltip>
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
                onRowsPerPageChange={() => {
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
