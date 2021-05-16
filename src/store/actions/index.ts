import { ADD_URL } from "../actionTypes"
import axios from "axios";
import { CREATE_URL, GET_URL } from "../../services/api";

const createAction = (type: string, payload: IUrl[]) => {
    return { type, payload }
}

/**
 * @description creates shortened url
 */
export const createUrl = (originalUrl: String, expirationTime: Date) => {
    return (dispatch: DispatchType) => {
        let createShortenUrlConfig: any = {
            ...CREATE_URL,
            withCredentials: true,
            params: {
                originalUrl: originalUrl,
                expirationTime: expirationTime
            }
        }
        axios(createShortenUrlConfig)
            .then((response: any) => {
                getAllUserUrls();
            })
            .catch((err) => {
                //error message
            }
            )
    }
};

/**
 * @description get all url belonging to a user
 */
export const getAllUserUrls = () => {
    return (dispatch: DispatchType) => {
        let getAllUserUrlsConfig: any = {
            ...GET_URL,
            withCredentials: true,
        }
        axios(getAllUserUrlsConfig)
            .then((response: any) => {
                dispatch(createAction(ADD_URL, response));
            })
            .catch((err) => {
                //error message
            }
            )
    }
};