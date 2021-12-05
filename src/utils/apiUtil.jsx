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
        connector.getJson("reservations", json, callBack, errorFunc);
    }
}

export default apiUtil;
