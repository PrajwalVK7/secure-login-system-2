import axios, { AxiosRequestConfig } from 'axios';

export const commonAPI = async (httpMethod: string, url: string, reqBody: any, reqHeader: any) => {
    let reqConfig: AxiosRequestConfig = {
        method: httpMethod,
        url: url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    };

    try {
        const result = await axios(reqConfig);
        return result;
    } catch (error) {
        return error;
    }
};
