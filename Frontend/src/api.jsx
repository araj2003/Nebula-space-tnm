//export const API_URL = "https://vetmed-back-as-nc.azurewebsites.net"
//export const API_URL = "https://vetfinalbackendtest.azurewebsites.net/"
// export const API_URL = "http://localhost:4000/api/v1";
export const API_URL =
  import.meta.env.DEV === true ? "http://localhost:4000/api/v1" : "/api/v1";
// export const API_URL = "/api/v1";
// export const API_URL="https://backendvetmed.azurewebsites.net"
//export const API_URL = "https://vetbackendtest.azurewebsites.net/"
