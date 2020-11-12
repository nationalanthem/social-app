import React from 'react'
import { Route, Redirect } from 'react-router-dom'

interface IProtectedRouteProps {
  component: React.FC
  isAuthenticated: boolean
  path: string
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
        }
      }}
    />
  )
}
