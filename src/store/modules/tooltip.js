export default {
    namespaced: true,
    state: {
        tooltip: null
    },
    actions: {
        setToolTip: ({ commit }, data) => {
            commit('SET_TOOL_TIP', data)
        },
        unsetToolTip: ({ commit }) => {
            commit('UNSET_TOOL_TIP')
        }
    },
    mutations:{
        SET_TOOL_TIP: ( state , data) => {
            state.tooltip = data
        },
        UNSET_TOOL_TIP: (state) => {
            state.tooltip = null
        }
    },
    getters: {
        tooltip: (state) => state.tooltip,
    }
}
