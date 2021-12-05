import axios from "axios";

import constants from "../constants";


const errorFunc = (e, error) => {
    error(e.data);
}

const successFunc = (val, success, error) => {
    if (typeof(val.data) === "object") {
        success(val.data);
    } else {
        errorFunc(val, error);
    }
}


const apiConnector = {
    postJson: (path, obj, success, error) => {
        axios.post(constants.API_URL + path, obj).then((v) => {
            successFunc(v, success, error);
        }, (e) => {
            errorFunc(e.response, error);
        });
    },
    getJson: (path, obj, success, error) => {
        axios.get(constants.API_URL + path, obj).then((v) => {
            successFunc(v, success, error);
        }, (e) => {
            errorFunc(e.response, error);
        });
    }
}

export default apiConnector;
