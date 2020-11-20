import { RootState } from '../../rootReducer'

export const selectUser = (state: RootState) => state.user.user
export const selectFollowers = (state: RootState) => state.user.user?.followers
export const selectFollowings = (state: RootState) => state.user.user?.followings
export const selectFollowingStatus = (state: RootState, userID: string) =>
  Boolean(state.user.user?.followings.find((following) => following._id === userID))
