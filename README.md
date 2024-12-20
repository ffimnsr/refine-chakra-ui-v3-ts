# Refine Plugin for Chakra UI v3

This repository contains a plugin for integrating Chakra UI v3 with Refine, an open-source, headless React framework for building enterprise internal tools, admin panels, dashboards, and B2B applications. This plugin provides seamless integration, allowing you to leverage the powerful and accessible components of Chakra UI v3 within your Refine projects.

## Chakra UI integration for Refine

[Chakra UI](https://chakra-ui.com/) is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

[Refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

Refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).

## Installation

To use Refine with Chakra UI, you need to install the following package `@ffimnsr/refine-chakra-ui-v3` along with the Chakra UI packages:

```sh
npm install @ffimnsr/refine-chakra-ui-v3 @chakra-ui/react
```

## ⚡ Try Refine

Start a new project with Refine in seconds using the following command:

```sh
npm create refine-app@latest my-refine-app
```

Or you can create a new project on your browser:

<a href="https://refine.dev/?playground=true" target="_blank">
  <img height="48" width="245" src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/try-it-in-your-browser.png" />
</a>

## Quick Start

Here's Refine in action, the below code is an example of a simple CRUD application using Refine + React Router + Material UI:

```tsx
import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core"
import {
  useNotificationProvider,
  RefineThemes,
  ErrorComponent,
} from "@refinedev/chakra-ui-v3"
import { BrowserRouter, Routes, Route } from "react-router"
import { ChakraProvider } from "@chakra-ui/react"
import dataProvider from "@refinedev/simple-rest"
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router"

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ChakraProvider value={RefineThemes.Default}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route index element={<WelcomePage />} />

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App

```

## Documentation

- [Refer to documentation for more info about refine](https://refine.dev/docs).
- [Step up to refine tutorials](https://refine.dev/tutorial).
