import {
  RootState,
  RootGetters,
  SFCCommit,
  SFCDispatch
} from 'typed-vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $state: RootState
    $getters: RootGetters
    $commit: SFCCommit
    $dispatch: SFCDispatch
  }
}
