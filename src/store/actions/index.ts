import { ADD_URL } from "../actionTypes"
import axios from "axios";
import { Moment } from "moment";
import { CREATE_URL, GET_URL } from "../../services/api";

const createAction = (type: string, payload: IUrl[]) => {
    return { type, payload }
}

/**
 * @description creates shortened url
 */
export const createUrl = (originalUrl: String, expirationTime: Moment | null) => {
    return (dispatch: any) => {
        let createShortenUrlConfig: any = {
            ...CREATE_URL,
            withCredentials: true,
            params: {
                originalUrl: originalUrl,
                expirationTime: expirationTime?.toISOString().slice(0, -1)
            }
        }
        axios(createShortenUrlConfig)
            .then((response: any) => {
                dispatch(getAllUserUrls());
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
    return function (dispatch: any) {
        let getAllUserUrlsConfig: any = {
            ...GET_URL,
            withCredentials: true,
        }
        axios(getAllUserUrlsConfig)
            .then((response: any) => {
                dispatch(createAction(ADD_URL, response.data));
            })
            .catch((err) => {
                //error message
            }
            )
    }
};