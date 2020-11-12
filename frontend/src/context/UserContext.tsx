import React from 'react'

export interface IUserContext {
  _id: string
  username: string
}

export const UserContext = React.createContext<IUserContext | null>(null)

export const useUserContext = () => React.useContext(UserContext)
