const util = {
    log: (val) => {
        console.log(val);
    },

    time2String: (dateTime) => {
        return ("00" + dateTime.getHours()).slice(-2) + ":" + ("00" + dateTime.getMinutes()).slice(-2);
    }
}

export default util;
