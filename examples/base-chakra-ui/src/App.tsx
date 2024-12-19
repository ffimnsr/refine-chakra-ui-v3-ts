import { GitHubBanner, Refine } from "@refinedev/core"
import {
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
  refineTheme,
} from "@refinedev/chakra-ui-v3"
import { ChakraProvider } from "@chakra-ui/react"
import dataProvider from "@refinedev/simple-rest"
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router"
import { BrowserRouter, Routes, Route, Outlet } from "react-router"

import { PostList, PostCreate, PostEdit, PostShow } from "./pages"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ChakraProvider theme={refineTheme}>
        <Refine
          notificationProvider={useNotificationProvider()}
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
