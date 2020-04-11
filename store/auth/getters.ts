import { Getters } from 'vuex'
import { AuthState } from './state'

export type AuthGetters = {
  isLoggedin: boolean
}

export type RootGetters = {
  'auth/isLoggedin': AuthGetters['isLoggedin']
}

const getters: Getters<AuthState, AuthGetters> = {
  isLoggedin (state) {
    return state.accessToken != null
  }
}

export default getters
