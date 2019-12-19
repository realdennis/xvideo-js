import * as React from "react";
import { useInput, Box, Color } from "ink";

interface ConfirmAgeProps {
  onAgreeHandler: () => void;
  onDisagreeHandler: () => void;
}

const ConfirmAge: React.FC<ConfirmAgeProps> = ({
  onAgreeHandler,
  onDisagreeHandler
}) => {
  useInput((input, key) => {
    if (input.toLowerCase() === "y" || key.return === true) {
      onAgreeHandler();
    }
    if (input.toLowerCase() === "n") {
      onDisagreeHandler();
    }
  });
  return (
    <Box flexDirection="column" alignItems="center">
      <Box paddingBottom={4}>
        Welcome to <Color red>Xvideo.js</Color>
      </Box>
      <Box>Are you 18?(Y/n)</Box>
    </Box>
  );
};

export default ConfirmAge;
