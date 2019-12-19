import * as React from "react";
import { render, useApp, Box } from "ink";
import ConfrimAge from "./components/ConfirmAge";
import Menu from "./components/Menu";
const App = () => {
  const [showAsk, setShowAsk] = React.useState(true);
  const { exit } = useApp();

  return (
    <Box justifyContent="center" alignItems="center" height="100%" width="100%">
      {showAsk ? (
        <ConfrimAge
          onAgreeHandler={() => setShowAsk(false)}
          onDisagreeHandler={() => exit()}
        ></ConfrimAge>
      ) : (
        <Menu />
      )}
    </Box>
  );
};
render(<App />);
