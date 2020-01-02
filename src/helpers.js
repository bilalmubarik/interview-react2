const helpers = {
    secondsToHms: function (d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    },
    storeSession: function (name, array) {
        sessionStorage.setItem(name, JSON.stringify(array));
    },
    getSession: function (name) {
        return JSON.parse(sessionStorage.getItem(name));
    },
    timeDiff: function (endTime, startTime) {
        return Math.floor((endTime - startTime)/1000);
    }
}

export default helpers;