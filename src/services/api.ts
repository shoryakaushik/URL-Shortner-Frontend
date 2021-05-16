// API Constants
export const HOST_URLS = {
    URL: `http://localhost:8080/url/`,
};

// API Configurations
export const CREATE_URL = {
    method: 'post',
    url: `${HOST_URLS['URL']}/create/`,
};

export const GET_URL = {
    method: 'get',
    url: `${HOST_URLS['URL']}/get-all-user-urls/`,
};