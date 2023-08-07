import api from "./config/axiosConfig"

export const AreaApi = {
  list: async function (cancel = false) {
    const response = await api.request({
      url: `/areas`,
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_PATH,
    })

    return response.data
  }
}
