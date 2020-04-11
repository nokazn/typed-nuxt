import { Mutations } from 'vuex'
import { AuthState } from './state'

export type AuthMutations = {
  setAccessToken: string | null
}

export type RootMutations = {
  'auth/setAccessToken': AuthMutations['setAccessToken']
}

const mutations: Mutations<AuthState, AuthMutations> = {
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken ?? null
  }
}

export default mutations
