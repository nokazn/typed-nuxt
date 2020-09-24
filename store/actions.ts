import { Actions } from 'typed-vuex'
import { RootState } from './state'
import { RootGetters } from './getters'
import { RootMutations } from './mutations'

export type RootActions = {};

const actions: Actions<RootState, RootActions, RootGetters, RootMutations> = {}

export default actions
