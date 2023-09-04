module.exports = {
    generateUUID: () => {
        var dt = new Date().getTime();
        var uuid = "xxxxyyxxyyxxyyyy".replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    },
    generateOTP: () => {
        var otp = Math.floor(100000 + Math.random() * 999999)
        return otp;
    },
    changeDateType: (date) => {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const today = `${dd}/${mm}/${yyyy}`;
        return today;
    },
};
