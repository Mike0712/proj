import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const rootEl = document.getElementById('root') as HTMLElement;
const csrf = rootEl.getAttribute('csrf');
if (csrf) {
    axios.interceptors.request.use(function (config: AxiosRequestConfig) {
        if (config.headers) {
            config.headers['X-CSRF-TOKEN'] = csrf;
        }
        return config;
    })
}

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    const { response } = error;

    toast.error(response.statusText, {
        theme: 'colored',
        autoClose: 10000,
    })
    throw error;
})

export const useAxios = () => {
    return axios;
}