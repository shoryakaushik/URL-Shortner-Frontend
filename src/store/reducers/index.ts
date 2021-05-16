import { ADD_URL } from "../actionTypes"

const initialState: UrlState = {
    urls: []
}

const reducer = (
    state: UrlState = initialState,
    action: UrlAction
): UrlState => {
    switch (action.type) {
        case ADD_URL:
            return { ...state, urls: action.payload }
    }
    return state
}

export default reducer;