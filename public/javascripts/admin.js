$("#harmburger").click(function () {
    $("#harmburger").toggleClass('active')
    $("#sidebar").toggleClass('close')
    $("#header").toggleClass('shrink')
    $("#main").toggleClass('shrink')
});

(function () {
    "use strict";
    feather.replace();
})()
