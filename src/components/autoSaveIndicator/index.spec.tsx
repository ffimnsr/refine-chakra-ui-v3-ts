import { autoSaveIndicatorTests } from "@refinedev/ui-tests"

import { AutoSaveIndicator, } from "./"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import React from "react";
import type { AutoSaveIndicatorProps } from "@refinedev/core";

const Wrapper: React.FC<AutoSaveIndicatorProps> = (props) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <AutoSaveIndicator {...props} />
    </ChakraProvider>
  );
};

describe("AutoSaveIndicator", () => {
  autoSaveIndicatorTests.bind(this)(Wrapper)
})
