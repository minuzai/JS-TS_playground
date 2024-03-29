import { fetchNewsList, fetchAsksList, fetchJobsList } from '../api/index'

export default {
  /* DEFAULT */
  FETCH_NEWS(context) {
    fetchNewsList()
      .then(response => {
        console.log(response.data)
        context.commit('SET_NEWS', response.data)
      })
      .catch(error => console.log(error))
  },

  /* ES6: Destructuring */
  FETCH_ASKS({ commit }) {  // Destructuring
    fetchAsksList()
      .then(({ data }) => {  // Destructuring
        console.log(data)
        commit('SET_ASKS', data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  /* Vuex Helper */
  FETCH_JOBS({ commit }) {
    fetchJobsList()
      .then(({ data }) => {
        console.log(data)
        commit('SET_JOBS', data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}