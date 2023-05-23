const BASE_URL = "https://api.fbi.gov/wanted/v1/"


// Singleton



export const getList = () => {
  return call({
    url: BASE_URL + 'list'
  })
}

// get paginated list

// get list with search params


// Call API
const call = async (options) => {
  return fetch(options.url).then((response) => {
    return response.json()
  }).then(json => {
    console.log(json)
    return json
  }).catch((error) => {
    console.error(error)
  })
}