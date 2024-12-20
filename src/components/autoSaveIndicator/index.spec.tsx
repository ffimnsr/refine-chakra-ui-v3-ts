import { autoSaveIndicatorTests } from "@refinedev/ui-tests"
import { AutoSaveIndicator } from "./"
import { ChakraTestWrapper } from "@test"

const Wrapper = ChakraTestWrapper(AutoSaveIndicator)

describe("AutoSaveIndicator", () => {
  autoSaveIndicatorTests.bind(this)(Wrapper)
})
