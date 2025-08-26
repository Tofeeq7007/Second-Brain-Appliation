import { createLazyFileRoute } from '@tanstack/react-router'
import { Signup } from '../Pages/Signup'

export const Route = createLazyFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Signup/></div>
}
