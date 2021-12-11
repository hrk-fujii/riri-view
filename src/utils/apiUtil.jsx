import util from "./util";
import connector from "./apiConnector";

const apiUtil = {
    getReservations: (callBack, roomId, date) => {
        const errorFunc = (val) => {
            util.log(val);
            return callBack("error");
        }
        const json = {
            roomId: roomId,
            date: date
        }
        connector.getJson("schedules", {params: json}, callBack, errorFunc);
    },

    getRooms: (callBack) => {
        const errorFunc = (val) => {
            util.log(val);
            return callBack("error");
        }
        connector.getJson("rooms", {}, callBack, errorFunc);
    },

    createReservation: (callBack, obj) => {
        callBack(s => ({...s, isLoading: true}));
        const errorFunc = (val) => {
            util.log(val);
            return callBack({
                isLoading: false,
                error: "error",
                success: false
            });
        }
        customBack = (val) => {
            callBack({
                isLoading: false,
                error: "",
                success: val
            });
        }
        connector.postJson("secure/create", obj, customBack, errorFunc);
    }
}

export default apiUtil;
