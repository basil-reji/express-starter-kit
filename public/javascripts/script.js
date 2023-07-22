(function () {
    "use strict";

    feather.replace()

    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 25) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    on('click', '.harmburger', function (e) {
        select('#nav-items').classList.toggle('active')
        this.classList.toggle('active')
    })


    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    // Animation on scroll
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

})();


$("#contact-form").submit(function (e) {
    e.preventDefault();
    $("loading").css("display", "block");
    $("#error-message").css("display", "none");
    $("#sent-message").css("display", "none");
    var $inputs = $('#contact-form :input');
    var data = {};
    $inputs.each(function () {
        data[this.name] = $(this).val();
    });

    setTimeout(() => {
        $.ajax({
            url: `/contact`,
            data: data,
            method: "post",
            success: (response) => {
                if (response.status) {
                    $("#loading").css("display", "none");
                    $("#sent-message").css("display", "block");
                    document.getElementsByName("contact-form")[0].reset();
                } else {
                    console.log(response);
                    $("#loading").css("display", "none");
                    $("#error-message").css("display", "block");
                }
            },
            error: (jqXHR, exception) => {
                $("#loading").css("display", "none");
                $("#error-message").css("display", "block");
            },
        });
    }, 1000);
})