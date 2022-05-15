/**
 * 유저정보와 토큰을 set하고 
 * 토큰여부를 확인하는 내용을 작성
 */
 export default {

  namespaced : true,

  state : {
      token : sessionStorage.getItem('access-token'),
      user : {
          id : '',
          name : ''
      }
  },

  getters : {
      id(state){
          return state.user.id;
      },

      name(state){
          return state.user.name;
      },

      token(state){
          return state.token;
      },

      hasToken(state){
          return !!state.token;
      }
  },

  mutations : {
      setName(state, name){
          state.user.name = name;
      },

      setToken(state, token){
          state.token = token;
          sessionStorage.setItem('access-token', token);
      },

      setId(state, id){
          state.user.id = id;
      },
  },

  actions : {
      setName({commit}, name){
          commit('setName', name);
      },

      setId({commit}, id){
          commit('setId', id);
      },
      
      setToken({commit}, token){
          commit('setToken', token);
      }
  }
}