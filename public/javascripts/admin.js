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

function deleteMessage(id) {
    if (confirm("Are you sure?. Do you want to delete? ") == true) {
        $.ajax({
            url: `/admin/messages/delete`,
            data: {
                id: id
            },
            method: 'post',
            success: (response) => {
                if (response.status) {
                    $(`#row-${id}`).remove()
                }
            }
        })
    }
}

function removeAdmin(id) {
    if (confirm("Are you sure?. Do you want to remove? ") == true) {
        $.ajax({
            url: `/admin/admins/remove`,
            data: {
                id: id
            },
            method: 'post',
            success: (response) => {
                if (response.status) {
                    $(`#row-${id}`).remove()
                }
            }
        })
    }
}