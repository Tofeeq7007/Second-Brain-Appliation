import { createFileRoute } from '@tanstack/react-router'
import NotFound from '../Pages/Error'

export const Route = createFileRoute('/testPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotFound/>
}
