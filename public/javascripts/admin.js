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

var input = document.querySelector("#phone");
window.intlTelInput(input, ({
    preferredCountries: ["in"],
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
}));

$(document).ready(function () {

    // var countryCode = $('.iti__selected-flag').attr('title');
    // var countryCode = countryCode.replace(/[^0-9]/g, '')
    // var phone = $('#phone').val()
    // phone.replace("0","")
    // $('#phone').val(phone);

    $('.iti__flag-container').click(function () {
        var countryCode = $('.iti__selected-flag').attr('title');
        var countryCode = countryCode.replace(/[^0-9]/g, '')
        $('#phone').val("");
        $('#phone').val("+" + countryCode + " " + $('#phone').val());
    });

    $("#account_update").submit(function (e) {
        e.preventDefault();

        var $inputs = $('#account_update :input');

        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
        });

        var countryCode = $('.iti__selected-flag').attr('title');
        var countryCode = countryCode.replace(/[^0-9]/g, '')

        if (!(values.phone.includes(countryCode))) {
            values.phone = `+${countryCode} ${values.phone.replace(" ", "").replace("0","")}`
        }

        $.ajax({
            url: `/admin/account/update`,
            method: 'post',
            data: values,
            success: (response) => {
                if (response.status == true) {
                    console.log('Success');
                } else {
                    console.log('Error');
                    console.log(response.message);
                }
            }
        })
    })
});

