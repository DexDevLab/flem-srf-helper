import axiosClient from "axios";
const { NEXT_PUBLIC_URL_SRF_BACKEND } = process.env;

/**
 * Conexão padrão com a API / Backend para aquisição de dados.
 * @method srfApi
 * @memberof module:services
 * @returns {Function} Instância Axios.
 */
export const srfApi = axiosClient.create({
  baseURL: NEXT_PUBLIC_URL_SRF_BACKEND,
  // timeout: 8000,
  headers: {
    // origin: "http://srf.beta.flem.org.br/",
    "Content-Type": "application/json",
  },
});

/**
 * Redefine os headers e valores de autenticação obtidos pela API.
 * @method setAuthHeaders
 * @memberof module:services
 * @returns {Object} Objeto com os headers fornecidos.
 */
export const setAuthHeaders = ({ id, lotacaoDominio }) => {
  srfApi.defaults.headers.common.idUser = id;
  srfApi.defaults.headers.common.lotacaoDominio = lotacaoDominio;
};

const MAX_REQUESTS_COUNT = 20
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0

srfApi.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS++
        clearInterval(interval)
        resolve(config)
      } 
    }, INTERVAL_MS)
  })
})

srfApi.interceptors.response.use(function (response) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.resolve(response)
}, function (error) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.reject(error)
})
