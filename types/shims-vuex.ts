import 'vuex'
import { IncomingMessage, ServerResponse } from 'http'

import * as Root from '~/store/types'
import * as Auth from '@/store/auth/types'
import { ActionMethodMap, Merge } from '@/types'

declare module 'vuex' {
  /**
   * モジュールを追加するごとに変更
   */
  type RootState = {
    auth: Auth.AuthState
  } & Root.RootState

  type RootGetters = Root.RootGetters
    & Auth.RootGetters

  type RootMutations = Root.RootMutations
    & Auth.RootMutations

  type RootActions = Root.RootActions
    & Auth.RootActions

  /**
   * 公式の型定義の拡張
   */
  type Getters<S, G> = {
    [K in keyof G]: (
      state: S,
      getters: G,
      rootState: RootState,
      rootGetters: RootGetters,
    ) => G[K]
  }

  type Mutations<S, M> = {
    [K in keyof M]: Extract<M[K], undefined> extends never
      ? (state: S, payload: M[K]) => void
      : (state: S, payload?: M[K]) => void
  }

  type ExtendedCommitArguments<
    M extends { [k: string]: any },
    T extends keyof Merge<M, RootMutations>
  > = T extends keyof RootMutations
    ? [RootMutations[T], { root: boolean }]
    : Extract<M[T], undefined> extends never
      ? [M[T]]
      : [M[T]?]

  type ExtendedCommit<M> = <T extends keyof Merge<M, RootMutations>>(
    type: T,
    ...args: ExtendedCommitArguments<M, T>
  ) => void

  type SFCCommitArguments<
    T extends keyof RootMutations
  > = Extract<RootMutations[T], undefined> extends never
    ? [RootMutations[T]]
    : [RootMutations[T]?]

  type SFCCommit = <T extends keyof RootMutations>(
    type: T,
    ...payload: SFCCommitArguments<T>,
  ) => void

  type ExtendedDispatchArguments<
    A extends ActionMethodMap,
    T extends keyof Merge<A, RootActions>
  > = T extends keyof RootActions
    ? [Parameters<RootActions[T]>[0], { root: boolean }]
    // undifined をとりうるか (省略可能か) で場合分け
    : Extract<Parameters<A[T]>[0], undefined> extends never
      ? [Parameters<A[T]>[0]]
      : [Parameters<A[T]>[0]?]

  type ExtendedDispatch<A extends ActionMethodMap> = <T extends keyof Merge<A, RootActions>>(
    type: T,
    ...args: ExtendedDispatchArguments<A, T>,
  ) => T extends keyof RootActions
    ? ReturnType<RootActions[T]>
    : ReturnType<A[T]>

  type SFCDispatch = <T extends keyof RootActions>(
    type: T,
    // undifined をとりうるか (省略可能か) で場合分け
    ...payload: Extract<Parameters<RootActions[T]>[0], undefined> extends never
    ? [Parameters<RootActions[T]>[0]]
    : [Parameters<RootActions[T]>[0]?]
  ) => ReturnType<RootActions[T]>

  type Context<S, G, M, A extends ActionMethodMap> = {
    state: S,
    getters: G,
    commit: ExtendedCommit<M>,
    dispatch: ExtendedDispatch<A>,
    rootState: RootState,
    rootGetters: RootGetters,
  }

  // nuxtServerInit 用
  type StoreContext = {
    state: RootState,
    getters: RootGetters,
    commit: ExtendedCommit<RootMutations>,
    dispatch: ExtendedDispatch<RootActions>
    rootState: RootState,
    rootGetters: RootGetters,
  }

  type Actions<S, A extends ActionMethodMap, G = {}, M = {}> = {
    [K in keyof A]: (
      // this は仮の引数
      this: Store<RootState>,
      context: Context<S, G, M, A>,
      payload: Parameters<A[K]>[0]
    ) => ReturnType<A[K]>
  } & {
    nuxtServerInit?: (
      context: StoreContext,
      payload: {
        req: IncomingMessage,
        res: ServerResponse,
        error: Error,
      },
    ) => void | Promise<void>
  }

  // Dispatch, Commit に互換性がない
  interface ExtendedStore extends Omit<Store<RootState>, 'commit' | 'dispatch'> {
    getters: RootGetters
    commit: ExtendedCommit<RootMutations>
    dispatch: ExtendedDispatch<RootActions>
  }
}
