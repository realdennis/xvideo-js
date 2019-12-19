import * as React from "react";
import { Box, Color, useInput } from "ink";

interface MenuProps {}
enum MenuEnum {
  Watch = 0,
  Search,
  Favorite
}
const Menu: React.FC<MenuProps> = ({}) => {
  //   useInput((input, key) => {});
  const [cursorIndex, setCursorIndex] = React.useState(0);

  useInput((_, key) => {
    if (key.upArrow) {
      setCursorIndex((cursorIndex - 1 + 3) % 3);
    }
    if (key.downArrow) {
      setCursorIndex((cursorIndex + 1) % 3);
    }
  });
  return (
    <Box flexDirection="column" alignItems="flex-start">
      <Box>
        <Color {...{ green: cursorIndex === MenuEnum.Watch }}>
          Watch the index page
        </Color>
      </Box>
      <Box>
        <Color {...{ green: cursorIndex === MenuEnum.Search }}>
          Search by keyword
        </Color>
      </Box>
      <Box>
        <Color {...{ green: cursorIndex === MenuEnum.Favorite }}>
          Your Favorite
        </Color>
      </Box>
    </Box>
  );
};

export default Menu;
