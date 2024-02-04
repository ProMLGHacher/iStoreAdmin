import axios from "axios";
import { RootState, store } from "../../app/store";
import { logOut, setTokens } from "../../feauters/authSlice";

export const $api = axios.create({
    baseURL: 'http://localhost:8090/'
})

$api.interceptors.request.use(async (config) => {
    const state: RootState = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Beraer ${accessToken}`;
    }

    return config;
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refToken = localStorage.getItem("refreshToken")

                // Вызов API для обновления access и refresh токенов
                const response = await $api.post('/api/token', { value: refToken });
                const { accessToken, refreshToken } = response.data;

                store.dispatch(setTokens({ accessToken, refreshToken }));

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return $api(originalRequest);
            } catch (error) {
                store.dispatch(logOut());
            }
        }

        return Promise.reject(error);
    }
);