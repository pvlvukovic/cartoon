import { FormControl, Input } from "@mui/material";
import * as React from "react";

let typingTimer: any;
let doneTypingInterval: number = 500;

type Props = {
  onSearch: (search: string) => void;
  value: string;
};

const Search: React.FC<Props> = ({ onSearch, value }: Props) => {
  const [search, setSearch] = React.useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Clear the timeout if it has already been set.
    clearTimeout(typingTimer);

    // Start a new timer for the typing action.
    typingTimer = setTimeout(() => {
      // Call the callback function.
      onSearch(search);
    }, doneTypingInterval);
  };

  return (
    <FormControl fullWidth>
      <Input
        placeholder="Search"
        value={search || value}
        onChange={handleSearch}
        onKeyUp={handleKeyUp}
        fullWidth
      />
    </FormControl>
  );
};

export default Search;
