import { buttonCloneTests } from "@refinedev/ui-tests"

import { CloneButton } from "./"
import { ChakraTestWrapper } from "@test"

const Wrapper = ChakraTestWrapper(CloneButton)

describe("Clone Button", () => {
  buttonCloneTests.bind(this)(Wrapper)
})
