import { createLazyFileRoute } from '@tanstack/react-router'
import { Signin } from '../Pages/Signin'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Signin/>
  </div>
}
