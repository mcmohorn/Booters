import api from "./config/axiosConfig"

export const UserAPI = {
  get: async function (cancel = false) {
    const response = await api.request({
      url: `/user`,
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_PATH,
      headers: {
        "Authorization": "Bearer "+ localStorage.getItem('token')
      }
    })

    return response.data
  }
}
