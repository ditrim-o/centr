import '../local_modules/jquery/dist/jquery.min'
import '../local_modules/jquery/dist/jquery.slim.min.js'
import 'owl.carousel'

$(document).ready(() => {

    /* sliders */

    $(`.video__slider_js`).owlCarousel({
        margin: 10,
        loop: true,
        autoWidth: false,
        items: 1,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 2
            },
        }
    })
    if (document.documentElement.clientWidth < 871) {
        $(`.cases__slider_js`).owlCarousel({
            loop: true,
            autoWidth: true,
            items: 4,
            margin: 0
        })
        $(`.sert__slider_js`).owlCarousel({
            loop: true,
            autoWidth: true,
            items: 3,
            margin: 40
        })
    }

    /* burger , mobile menu*/

    $(`#burger`).click(function () {
        const menu = document.querySelector(`#burger`)
        const menuMob = document.querySelector(`.menu-mob`)
        const menutop = document.querySelector(`.header-wrapper`)
        const body = document.getElementsByTagName(`body`)[0]

        if (menu.classList.contains(`burger_active`)) {
            menu.classList.add(`burger_close`)
            menu.classList.remove(`burger_active`)
        } else {
            menu.classList.add(`burger_active`)
            menu.classList.remove(`burger_close`)
        }
        if (menuMob.classList.contains(`menu-mob_active`)) {
            menuMob.classList.remove(`menu-mob_active`)
            body.classList.remove(`scroll-hide`)

        } else {
            menuMob.classList.add(`menu-mob_active`)
            /* menutop.classList.add(`header__scroll-mob`)*/
            body.classList.add(`scroll-hide`)
        }
    })
    if (document.documentElement.clientWidth < 871) {
        const menuLink = document.querySelectorAll(`.menu-link`)
        const menuMob = document.querySelector(`.menu-mob`)
        const menu = document.querySelector(`#burger`)
        for (let i = 0; i < menuLink.length; i++) {
            menuLink[i].addEventListener(`click`, function () {
                if (menuMob.classList.contains(`menu-mob_active`)) {
                    menuMob.classList.remove(`menu-mob_active`)
                    body.classList.remove(`scroll-hide`)
                    menu.classList.remove(`burger_active`)
                    menu.classList.add(`burger_close`)

                }
            })
        }
    }

    /* text show/hide*/

    const topHide = document.querySelector(`.read-more-first`)
    const bottomHide = document.querySelector(`.read-more-second`)
    const topText = document.querySelector(`.services__include-bottom-text`)
    const bottomText = document.querySelector(`.hide-bottom `)

    topHide.addEventListener(`click`, function () {
        if (topText.classList.contains(`hide`)) {
            topText.classList.remove(`hide`)
            topHide.innerHTML = `Скрыть`
        } else {
            topText.classList.add(`hide`)
            topHide.innerHTML = `Читать больше`
        }

    })
    bottomHide.addEventListener(`click`, function () {
        if (bottomText.classList.contains(`hide-bottom`)) {
            bottomText.classList.remove(`hide-bottom`)
            bottomHide.innerHTML = `Скрыть`
        } else {
            bottomText.classList.add(`hide-bottom`)
            bottomHide.innerHTML = `Читать больше`
        }

    })

    /* popup show/hide */

    const popup = document.querySelector(`.popup-wrapper`)
    const closePopup = document.querySelector(`.popup__close`)
    const showPopup = document.querySelectorAll(`.show-form`)
    const body = document.getElementsByTagName(`body`)[0]

    for (let i = 0; i < showPopup.length; i++) {
        showPopup[i].addEventListener(`click`, function () {
            popup.classList.add(`popup_active`)
            body.classList.add(`scroll-hide`)

        })
    }

    popup.addEventListener(`click`, function (event) {
        if (event.target == popup || event.target == closePopup) { 
            popup.classList.remove(`popup_active`)
            body.classList.remove(`scroll-hide`)}
        
    })


    /* fixed scroll menu*/

    let z = 0
    const menuScroll = document.querySelector(`.header-wrapper`)
    const banner = document.querySelector(`.banner`)
    window.addEventListener(`scroll`, function () {


        if (document.documentElement.clientWidth > 870) {
            menuScroll.classList.add(`header__scroll`)
            banner.style.marginTop = `90px`
            if (window.pageYOffset == 0) {
                menuScroll.classList.remove(`header__scroll`)
                banner.style.marginTop = `0px`
            }
        } else {
            if (window.pageYOffset < 65) {
            } else if (z > window.pageYOffset) {
                menuScroll.classList.add(`header__scroll-mob`)
                menuScroll.style.opacity = `1`
                banner.style.marginTop = `65px`
            } else {
                menuScroll.classList.remove(`header__scroll-mob`)
                menuScroll.style.opacity = `0`
                banner.style.marginTop = `0px`

            }

        }
        z = window.pageYOffset
    })

    /* parallax*/

    let y = 0
    const services = document.querySelector(`#rear-services`)
    const calc = document.querySelector(`#rear-calc`)
    const question = document.querySelector(`#rear-question`)
    const expert = document.querySelector(`#rear-expert`)
    const winHeight = window.innerHeight

    const servicesStart = startPos(services)
    const calcStart = startPos(calc)
    const questionStart = startPos(question)
    const expertStart = startPos(expert)

    function startPos(val) {
        z = parseInt(getComputedStyle(val).left, 10)

        return z
    }

    function getCoords(elem) {
        const box = elem.getBoundingClientRect()
        const top = box.top + pageYOffset
        return top

    }
    window.addEventListener(`scroll`, function () {
        const start = winHeight + window.pageYOffset - 40
        if (document.documentElement.clientWidth > 1300) {
            parallax(calc, `left`, calcStart, 10)
            parallax(services, `left`, servicesStart, 15)
            parallax(question, `left`, questionStart, 15)
            parallax(expert, `right`, expertStart, 10)
        }
        function parallax(obj, direction, begin, speed) {
            const cords = getCoords(obj)
            let pos = parseInt(getComputedStyle(obj).left, 10)
            if (start > cords && start < cords + winHeight) {
                if (y < window.pageYOffset) {
                    if (direction == `left` && pos > begin - 350) {
                        pos = pos - speed
                        obj.style.left = pos + `px`
                    } else {
                        if (pos < begin + 350) {
                            pos = pos + speed
                            obj.style.left = pos + `px`
                        }
                    }
                } else {
                    if (direction == `left` && begin > pos) {
                        pos = pos + speed
                        obj.style.left = pos + `px`
                    } else {
                        if (begin < pos) {
                            pos = pos - speed
                            obj.style.left = pos + `px`
                        }
                    }
                }
            }
        }
        y = window.pageYOffset
    })


    /* smooth scrolling */

    document.querySelectorAll(`.scroll-to`).forEach((link) => {

        link.addEventListener(`click`, function (e) {
            e.preventDefault()

            const href = this.getAttribute(`href`).substring(1)

            const scrollTarget = document.getElementById(href)

            const topOffset = 80
            const elementPosition = scrollTarget.getBoundingClientRect().top
            const offsetPosition = elementPosition - topOffset

            window.scrollBy({
                top: offsetPosition,
                behavior: `smooth`
            })
        })
    })


})

/* YT video*/


const tag = document.createElement(`script`)
tag.src = `https://www.youtube.com/iframe_api`
const firstScriptTag = document.getElementsByTagName(`script`)[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
window.onYouTubePlayerAPIReady = function () {
    const video = document.querySelectorAll(`.video-yt`)
    const videoBtn = document.querySelectorAll(`.video__thumbnail`)
    videoBtn.forEach(function (item, i, arr) {
        item.addEventListener(`click`, () => {
            item.style.display = `none`
            const id = video[i].getAttribute(`vidid`)
            player = new YT.Player(video[i], {
                height: `100%`,
                width: `100%`,
                videoId: id,
                events: {
                    'onReady': onPlayerReady
                }

            })

        })
    })

}

function onPlayerReady(event) {
    event.target.playVideo()
}


