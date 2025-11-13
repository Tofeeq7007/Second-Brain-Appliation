import { createFileRoute } from '@tanstack/react-router'
import { Signup } from '../Pages/Signup'

export const Route = createFileRoute('/testPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Signup/></div>
}