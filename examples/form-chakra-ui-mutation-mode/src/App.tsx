import { GitHubBanner, type MutationMode, Refine } from "@refinedev/core"
import {
  ErrorComponent,
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
} from "@ffimnsr/refine-chakra-ui-v3"
import { ChakraProvider } from "@chakra-ui/react"
import dataProvider from "@refinedev/simple-rest"
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router"
import { BrowserRouter, Routes, Route, Outlet } from "react-router"

import { PostList, PostCreate, PostEdit, PostShow } from "./pages"
import MutationModePicker from "./components/mutation-mode-picker"
import { useState } from "react"

const API_URL = "https://api.fake-rest.refine.dev"

const App: React.FC = () => {
  const [mutationMode, setMutationMode] = useState<MutationMode>("undoable")

  return (
    <BrowserRouter>
      <GitHubBanner />
      <ChakraProvider value={RefineThemes.Default}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            mutationMode: mutationMode,
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
        <MutationModePicker
          currentMutationMode={mutationMode}
          onMutationModeChange={setMutationMode}
        />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
