import api from "./config/axiosConfig"

export const JumpApi = {
  list: async function (cancel = false) {
    const response = await api.request({
      url: `/jumps`,
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_PATH,
      // headers: {
      //   "Authorization": "Bearer "+ localStorage.getItem('token')
      // }
    })

    return response.data
  }
}
