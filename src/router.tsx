import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import ContentEditableEditor from './components/ContentEditableEditor'
import Editor from './components/Editor'

const rootRoute = createRootRoute({
  component: App,
})

const tiptapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Editor,
})

const contentEditableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contenteditable',
  component: ContentEditableEditor,
})

const routeTree = rootRoute.addChildren([tiptapRoute, contentEditableRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
