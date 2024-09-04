import axios from "axios";

const axiosClient = axios.create({
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 30000,
})
const toSnake = (string) => {
    return string
        .replace(/[\w]([A-Z])/g, (m) => {
            return `${m[0]}_${m[1]}`
        })
        .toLowerCase()
}

const isObject = (o) => {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function'
}
const toCamel = (string) => {
    return string.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '')
    })
}

const convertKeys = (inputCase, input) => {
    const convertFunc = inputCase === 'camel' ? toCamel : toSnake
    if (isObject(input)) {
        let n = {}
        Object.keys(input).forEach((k) => {
            n[convertFunc(k)] = convertKeys(inputCase, input[k])
        })
        return n
    }
    if (Array.isArray(input)) {
        return input.map((i) => {
            return convertKeys(inputCase, i)
        })
    }

    return input
}

 const snakeToCamel = (obj) => {
    return obj ? convertKeys('camel', obj) : ''
}
axiosClient.interceptors.request.use(
    (config) => {
        if (!config.headers.getContentType()) {
            config.headers = {...config.headers, 'Content-Type': 'application/json'}
        }
        return config
    },
    (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
    (response) => {
        return {
            ...snakeToCamel(response.data),
            status: 200,
        }
    },
)
export default axiosClient
