import api from "./config/axiosConfig"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const UserAPI = {
  get: async function (cancel = false) {
    const response = await api.request({
      url: `/user`,
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_PATH
      // retrieving the signal value by using the property name
      // signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  }
}

// defining the cancel API object for ProductAPI
// comeback later to do this https://semaphoreci.com/blog/api-layer-react (need the utils file)
// const cancelApiObject = defineCancelApiObject(ProductAPI)