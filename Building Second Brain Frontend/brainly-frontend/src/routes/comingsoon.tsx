import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/comingsoon')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='font-bold p-4'>This Page is not ready yet.</div>
}
