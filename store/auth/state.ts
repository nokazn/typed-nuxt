export type AuthState = {
  accessToken: string | null
}

const state: () => AuthState = () => ({
  accessToken: null
})

export default state
