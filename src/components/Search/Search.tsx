import { FormControl, Input } from "@mui/material";
import * as React from "react";

let typingTimer: any;
let doneTypingInterval: number = 500;

type Props = {
  onSearch: (search: string) => void;
  value: string;
};

const Search: React.FC<Props> = ({ onSearch, value }: Props) => {
  const [search, setSearch] = React.useState<string>(value);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyUp = () => {
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
        value={search}
        onChange={handleSearch}
        onKeyUp={handleKeyUp}
        fullWidth
        autoFocus
      />
    </FormControl>
  );
};

export default Search;
