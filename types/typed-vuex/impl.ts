import * as Root from '~/store/types'
import * as Auth from '~/store/auth/types'

/**
 * モジュールを追加するごとに変更
 */
declare module 'typed-vuex' {
  type RootState = {
    auth: Auth.AuthState
  } & Root.RootState

  type RootGetters = Root.RootGetters
    & Auth.RootGetters

  type RootMutations = Root.RootMutations
    & Auth.RootMutations

  type RootActions = Root.RootActions
    & Auth.RootActions
}
