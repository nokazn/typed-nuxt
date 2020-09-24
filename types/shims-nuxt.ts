import {
  RootState,
  RootGetters,
  SFCCommit,
  SFCDispatch
} from 'typed-vuex'

declare module '@nuxt/types/app' {
  interface NuxtAppOptions {
    $state: RootState
    $getters: RootGetters
    $commit: SFCCommit
    $dispatch: SFCDispatch
  }
}
