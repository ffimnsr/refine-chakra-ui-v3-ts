import { buttonCreateTests } from "@refinedev/ui-tests"
import { CreateButton } from "./"
import { ChakraTestWrapper } from "@test"

const Wrapper = ChakraTestWrapper(CreateButton)


describe("Create Button", () => {
  buttonCreateTests.bind(this)(Wrapper)
})
