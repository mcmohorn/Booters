import api from "./config/axiosConfig"

export const JumpApi = {
  list: async function (cancel = false) {
    try {
      const response = await api.request({
        url: `/jumps`,
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_PATH,
      })
  
      return response.data
    }
    catch(e) {
      console.log('jumps api failed')
    }
    
  }
}
