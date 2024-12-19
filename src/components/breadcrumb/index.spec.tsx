import React, { type ReactNode } from "react"
import { Route, Routes } from "react-router-dom"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { render, TestWrapper, type ITestWrapperProps } from "@test"

import { Breadcrumb, type BreadcrumbProps } from "./"
import { breadcrumbTests } from "@refinedev/ui-tests"
import { refineTheme } from "src/theme"

const renderBreadcrumb = (
  children: ReactNode,
  wrapperProps: ITestWrapperProps = {},
) => {
  return render(
    <Routes>
      <Route path="/:resource/:action" element={children} />
    </Routes>,
    {
      wrapper: TestWrapper(wrapperProps),
    },
  )
}

const Wrapper: React.FC<BreadcrumbProps> = (props) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Breadcrumb {...props} />
    </ChakraProvider>
  );
};

const DummyDashboard = () => <div>Dashboard</div>

describe("Breadcrumb", () => {
  beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn())
  })

  breadcrumbTests.bind(this)(Wrapper)

  it("should render home icon", async () => {
    const { container } = renderBreadcrumb(<Wrapper />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
      DashboardPage: DummyDashboard,
    })

    expect(container.querySelector("svg")).toBeTruthy()
  })

  it("should not render home icon with 'showhHome' props", async () => {
    const { container } = renderBreadcrumb(<Wrapper showHome={false} />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
      DashboardPage: DummyDashboard,
    })

    expect(container.querySelector("svg")).toBeFalsy()
  })

  it("should render breadcrumb items", async () => {
    const { getByText } = renderBreadcrumb(<Wrapper />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
    })

    getByText("Posts")
    getByText("Create")
  })
})
