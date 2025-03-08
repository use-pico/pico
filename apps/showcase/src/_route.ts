/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './@routes/__root'
import { Route as LocaleImport } from './@routes/$locale'
import { Route as IndexImport } from './@routes/index'
import { Route as LocaleIndexImport } from './@routes/$locale/index'
import { Route as LocaleComponentsImport } from './@routes/$locale/components'
import { Route as LocaleComponentsIndexImport } from './@routes/$locale/components/index'
import { Route as LocaleComponentsTableImport } from './@routes/$locale/components/table'
import { Route as LocaleComponentsPopupSelectImport } from './@routes/$locale/components/popup-select'
import { Route as LocaleComponentsButtonImport } from './@routes/$locale/components/button'

// Create/Update Routes

const LocaleRoute = LocaleImport.update({
  id: '/$locale',
  path: '/$locale',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LocaleIndexRoute = LocaleIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LocaleRoute,
} as any)

const LocaleComponentsRoute = LocaleComponentsImport.update({
  id: '/components',
  path: '/components',
  getParentRoute: () => LocaleRoute,
} as any)

const LocaleComponentsIndexRoute = LocaleComponentsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LocaleComponentsRoute,
} as any)

const LocaleComponentsTableRoute = LocaleComponentsTableImport.update({
  id: '/table',
  path: '/table',
  getParentRoute: () => LocaleComponentsRoute,
} as any)

const LocaleComponentsPopupSelectRoute =
  LocaleComponentsPopupSelectImport.update({
    id: '/popup-select',
    path: '/popup-select',
    getParentRoute: () => LocaleComponentsRoute,
  } as any)

const LocaleComponentsButtonRoute = LocaleComponentsButtonImport.update({
  id: '/button',
  path: '/button',
  getParentRoute: () => LocaleComponentsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$locale': {
      id: '/$locale'
      path: '/$locale'
      fullPath: '/$locale'
      preLoaderRoute: typeof LocaleImport
      parentRoute: typeof rootRoute
    }
    '/$locale/components': {
      id: '/$locale/components'
      path: '/components'
      fullPath: '/$locale/components'
      preLoaderRoute: typeof LocaleComponentsImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/': {
      id: '/$locale/'
      path: '/'
      fullPath: '/$locale/'
      preLoaderRoute: typeof LocaleIndexImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/components/button': {
      id: '/$locale/components/button'
      path: '/button'
      fullPath: '/$locale/components/button'
      preLoaderRoute: typeof LocaleComponentsButtonImport
      parentRoute: typeof LocaleComponentsImport
    }
    '/$locale/components/popup-select': {
      id: '/$locale/components/popup-select'
      path: '/popup-select'
      fullPath: '/$locale/components/popup-select'
      preLoaderRoute: typeof LocaleComponentsPopupSelectImport
      parentRoute: typeof LocaleComponentsImport
    }
    '/$locale/components/table': {
      id: '/$locale/components/table'
      path: '/table'
      fullPath: '/$locale/components/table'
      preLoaderRoute: typeof LocaleComponentsTableImport
      parentRoute: typeof LocaleComponentsImport
    }
    '/$locale/components/': {
      id: '/$locale/components/'
      path: '/'
      fullPath: '/$locale/components/'
      preLoaderRoute: typeof LocaleComponentsIndexImport
      parentRoute: typeof LocaleComponentsImport
    }
  }
}

// Create and export the route tree

interface LocaleComponentsRouteChildren {
  LocaleComponentsButtonRoute: typeof LocaleComponentsButtonRoute
  LocaleComponentsPopupSelectRoute: typeof LocaleComponentsPopupSelectRoute
  LocaleComponentsTableRoute: typeof LocaleComponentsTableRoute
  LocaleComponentsIndexRoute: typeof LocaleComponentsIndexRoute
}

const LocaleComponentsRouteChildren: LocaleComponentsRouteChildren = {
  LocaleComponentsButtonRoute: LocaleComponentsButtonRoute,
  LocaleComponentsPopupSelectRoute: LocaleComponentsPopupSelectRoute,
  LocaleComponentsTableRoute: LocaleComponentsTableRoute,
  LocaleComponentsIndexRoute: LocaleComponentsIndexRoute,
}

const LocaleComponentsRouteWithChildren =
  LocaleComponentsRoute._addFileChildren(LocaleComponentsRouteChildren)

interface LocaleRouteChildren {
  LocaleComponentsRoute: typeof LocaleComponentsRouteWithChildren
  LocaleIndexRoute: typeof LocaleIndexRoute
}

const LocaleRouteChildren: LocaleRouteChildren = {
  LocaleComponentsRoute: LocaleComponentsRouteWithChildren,
  LocaleIndexRoute: LocaleIndexRoute,
}

const LocaleRouteWithChildren =
  LocaleRoute._addFileChildren(LocaleRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$locale': typeof LocaleRouteWithChildren
  '/$locale/components': typeof LocaleComponentsRouteWithChildren
  '/$locale/': typeof LocaleIndexRoute
  '/$locale/components/button': typeof LocaleComponentsButtonRoute
  '/$locale/components/popup-select': typeof LocaleComponentsPopupSelectRoute
  '/$locale/components/table': typeof LocaleComponentsTableRoute
  '/$locale/components/': typeof LocaleComponentsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$locale': typeof LocaleIndexRoute
  '/$locale/components/button': typeof LocaleComponentsButtonRoute
  '/$locale/components/popup-select': typeof LocaleComponentsPopupSelectRoute
  '/$locale/components/table': typeof LocaleComponentsTableRoute
  '/$locale/components': typeof LocaleComponentsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$locale': typeof LocaleRouteWithChildren
  '/$locale/components': typeof LocaleComponentsRouteWithChildren
  '/$locale/': typeof LocaleIndexRoute
  '/$locale/components/button': typeof LocaleComponentsButtonRoute
  '/$locale/components/popup-select': typeof LocaleComponentsPopupSelectRoute
  '/$locale/components/table': typeof LocaleComponentsTableRoute
  '/$locale/components/': typeof LocaleComponentsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/$locale'
    | '/$locale/components'
    | '/$locale/'
    | '/$locale/components/button'
    | '/$locale/components/popup-select'
    | '/$locale/components/table'
    | '/$locale/components/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/$locale'
    | '/$locale/components/button'
    | '/$locale/components/popup-select'
    | '/$locale/components/table'
    | '/$locale/components'
  id:
    | '__root__'
    | '/'
    | '/$locale'
    | '/$locale/components'
    | '/$locale/'
    | '/$locale/components/button'
    | '/$locale/components/popup-select'
    | '/$locale/components/table'
    | '/$locale/components/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LocaleRoute: typeof LocaleRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LocaleRoute: LocaleRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$locale"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$locale": {
      "filePath": "$locale.tsx",
      "children": [
        "/$locale/components",
        "/$locale/"
      ]
    },
    "/$locale/components": {
      "filePath": "$locale/components.tsx",
      "parent": "/$locale",
      "children": [
        "/$locale/components/button",
        "/$locale/components/popup-select",
        "/$locale/components/table",
        "/$locale/components/"
      ]
    },
    "/$locale/": {
      "filePath": "$locale/index.tsx",
      "parent": "/$locale"
    },
    "/$locale/components/button": {
      "filePath": "$locale/components/button.tsx",
      "parent": "/$locale/components"
    },
    "/$locale/components/popup-select": {
      "filePath": "$locale/components/popup-select.tsx",
      "parent": "/$locale/components"
    },
    "/$locale/components/table": {
      "filePath": "$locale/components/table.tsx",
      "parent": "/$locale/components"
    },
    "/$locale/components/": {
      "filePath": "$locale/components/index.tsx",
      "parent": "/$locale/components"
    }
  }
}
ROUTE_MANIFEST_END */
