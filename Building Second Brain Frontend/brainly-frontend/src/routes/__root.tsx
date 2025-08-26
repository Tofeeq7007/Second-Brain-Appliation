import * as React from 'react'
import '../App.css'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import NotFound from '../Pages/Error'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: ()=> <NotFound/>
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className=''>
      <Outlet />
      </div>
    </React.Fragment>
  )
}
