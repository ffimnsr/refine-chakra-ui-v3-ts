import { buttonDeleteTests } from "@refinedev/ui-tests"
import { DeleteButton } from "./"
import { ChakraTestWrapper } from "@test"

const Wrapper = ChakraTestWrapper(DeleteButton)

describe("Delete Button", () => {
  buttonDeleteTests.bind(this)(Wrapper)
})
