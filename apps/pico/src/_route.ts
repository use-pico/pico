/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './@routes/__root'
import { Route as AboutImport } from './@routes/about'
import { Route as LocaleImport } from './@routes/$locale'
import { Route as IndexImport } from './@routes/index'
import { Route as LocaleIndexImport } from './@routes/$locale/index'
import { Route as LocaleAppsImport } from './@routes/$locale/apps'
import { Route as LocalePublicIndexImport } from './@routes/$locale/public/index'
import { Route as LocaleAppsIndexImport } from './@routes/$locale/apps/index'
import { Route as LocalePublicRegisterImport } from './@routes/$locale/public/register'
import { Route as LocalePublicLogoutImport } from './@routes/$locale/public/logout'
import { Route as LocalePublicLoginImport } from './@routes/$locale/public/login'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

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

const LocaleAppsRoute = LocaleAppsImport.update({
  id: '/apps',
  path: '/apps',
  getParentRoute: () => LocaleRoute,
} as any)

const LocalePublicIndexRoute = LocalePublicIndexImport.update({
  id: '/public/',
  path: '/public/',
  getParentRoute: () => LocaleRoute,
} as any)

const LocaleAppsIndexRoute = LocaleAppsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LocaleAppsRoute,
} as any)

const LocalePublicRegisterRoute = LocalePublicRegisterImport.update({
  id: '/public/register',
  path: '/public/register',
  getParentRoute: () => LocaleRoute,
} as any)

const LocalePublicLogoutRoute = LocalePublicLogoutImport.update({
  id: '/public/logout',
  path: '/public/logout',
  getParentRoute: () => LocaleRoute,
} as any)

const LocalePublicLoginRoute = LocalePublicLoginImport.update({
  id: '/public/login',
  path: '/public/login',
  getParentRoute: () => LocaleRoute,
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/$locale/apps': {
      id: '/$locale/apps'
      path: '/apps'
      fullPath: '/$locale/apps'
      preLoaderRoute: typeof LocaleAppsImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/': {
      id: '/$locale/'
      path: '/'
      fullPath: '/$locale/'
      preLoaderRoute: typeof LocaleIndexImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/public/login': {
      id: '/$locale/public/login'
      path: '/public/login'
      fullPath: '/$locale/public/login'
      preLoaderRoute: typeof LocalePublicLoginImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/public/logout': {
      id: '/$locale/public/logout'
      path: '/public/logout'
      fullPath: '/$locale/public/logout'
      preLoaderRoute: typeof LocalePublicLogoutImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/public/register': {
      id: '/$locale/public/register'
      path: '/public/register'
      fullPath: '/$locale/public/register'
      preLoaderRoute: typeof LocalePublicRegisterImport
      parentRoute: typeof LocaleImport
    }
    '/$locale/apps/': {
      id: '/$locale/apps/'
      path: '/'
      fullPath: '/$locale/apps/'
      preLoaderRoute: typeof LocaleAppsIndexImport
      parentRoute: typeof LocaleAppsImport
    }
    '/$locale/public/': {
      id: '/$locale/public/'
      path: '/public'
      fullPath: '/$locale/public'
      preLoaderRoute: typeof LocalePublicIndexImport
      parentRoute: typeof LocaleImport
    }
  }
}

// Create and export the route tree

interface LocaleAppsRouteChildren {
  LocaleAppsIndexRoute: typeof LocaleAppsIndexRoute
}

const LocaleAppsRouteChildren: LocaleAppsRouteChildren = {
  LocaleAppsIndexRoute: LocaleAppsIndexRoute,
}

const LocaleAppsRouteWithChildren = LocaleAppsRoute._addFileChildren(
  LocaleAppsRouteChildren,
)

interface LocaleRouteChildren {
  LocaleAppsRoute: typeof LocaleAppsRouteWithChildren
  LocaleIndexRoute: typeof LocaleIndexRoute
  LocalePublicLoginRoute: typeof LocalePublicLoginRoute
  LocalePublicLogoutRoute: typeof LocalePublicLogoutRoute
  LocalePublicRegisterRoute: typeof LocalePublicRegisterRoute
  LocalePublicIndexRoute: typeof LocalePublicIndexRoute
}

const LocaleRouteChildren: LocaleRouteChildren = {
  LocaleAppsRoute: LocaleAppsRouteWithChildren,
  LocaleIndexRoute: LocaleIndexRoute,
  LocalePublicLoginRoute: LocalePublicLoginRoute,
  LocalePublicLogoutRoute: LocalePublicLogoutRoute,
  LocalePublicRegisterRoute: LocalePublicRegisterRoute,
  LocalePublicIndexRoute: LocalePublicIndexRoute,
}

const LocaleRouteWithChildren =
  LocaleRoute._addFileChildren(LocaleRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$locale': typeof LocaleRouteWithChildren
  '/about': typeof AboutRoute
  '/$locale/apps': typeof LocaleAppsRouteWithChildren
  '/$locale/': typeof LocaleIndexRoute
  '/$locale/public/login': typeof LocalePublicLoginRoute
  '/$locale/public/logout': typeof LocalePublicLogoutRoute
  '/$locale/public/register': typeof LocalePublicRegisterRoute
  '/$locale/apps/': typeof LocaleAppsIndexRoute
  '/$locale/public': typeof LocalePublicIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/$locale': typeof LocaleIndexRoute
  '/$locale/public/login': typeof LocalePublicLoginRoute
  '/$locale/public/logout': typeof LocalePublicLogoutRoute
  '/$locale/public/register': typeof LocalePublicRegisterRoute
  '/$locale/apps': typeof LocaleAppsIndexRoute
  '/$locale/public': typeof LocalePublicIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$locale': typeof LocaleRouteWithChildren
  '/about': typeof AboutRoute
  '/$locale/apps': typeof LocaleAppsRouteWithChildren
  '/$locale/': typeof LocaleIndexRoute
  '/$locale/public/login': typeof LocalePublicLoginRoute
  '/$locale/public/logout': typeof LocalePublicLogoutRoute
  '/$locale/public/register': typeof LocalePublicRegisterRoute
  '/$locale/apps/': typeof LocaleAppsIndexRoute
  '/$locale/public/': typeof LocalePublicIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/$locale'
    | '/about'
    | '/$locale/apps'
    | '/$locale/'
    | '/$locale/public/login'
    | '/$locale/public/logout'
    | '/$locale/public/register'
    | '/$locale/apps/'
    | '/$locale/public'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/$locale'
    | '/$locale/public/login'
    | '/$locale/public/logout'
    | '/$locale/public/register'
    | '/$locale/apps'
    | '/$locale/public'
  id:
    | '__root__'
    | '/'
    | '/$locale'
    | '/about'
    | '/$locale/apps'
    | '/$locale/'
    | '/$locale/public/login'
    | '/$locale/public/logout'
    | '/$locale/public/register'
    | '/$locale/apps/'
    | '/$locale/public/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LocaleRoute: typeof LocaleRouteWithChildren
  AboutRoute: typeof AboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LocaleRoute: LocaleRouteWithChildren,
  AboutRoute: AboutRoute,
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
        "/$locale",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$locale": {
      "filePath": "$locale.tsx",
      "children": [
        "/$locale/apps",
        "/$locale/",
        "/$locale/public/login",
        "/$locale/public/logout",
        "/$locale/public/register",
        "/$locale/public/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/$locale/apps": {
      "filePath": "$locale/apps.tsx",
      "parent": "/$locale",
      "children": [
        "/$locale/apps/"
      ]
    },
    "/$locale/": {
      "filePath": "$locale/index.tsx",
      "parent": "/$locale"
    },
    "/$locale/public/login": {
      "filePath": "$locale/public/login.tsx",
      "parent": "/$locale"
    },
    "/$locale/public/logout": {
      "filePath": "$locale/public/logout.tsx",
      "parent": "/$locale"
    },
    "/$locale/public/register": {
      "filePath": "$locale/public/register.tsx",
      "parent": "/$locale"
    },
    "/$locale/apps/": {
      "filePath": "$locale/apps/index.tsx",
      "parent": "/$locale/apps"
    },
    "/$locale/public/": {
      "filePath": "$locale/public/index.tsx",
      "parent": "/$locale"
    }
  }
}
ROUTE_MANIFEST_END */