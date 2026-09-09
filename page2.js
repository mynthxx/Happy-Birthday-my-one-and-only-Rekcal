/* =====================================================
   PAGE 2 — JAVASCRIPT
   MUSIC + APP WINDOWS + BACKGROUND BLUR
===================================================== */


/* =====================================================
   HIỂN THỊ GIỜ VIỆT NAM
===================================================== */

function updateMenuTime() {

    const now = new Date();

    const vietnamTime = new Intl.DateTimeFormat(
        "vi-VN",
        {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    ).format(now);

    const menuTime =
        document.getElementById("menu-time");

    if (menuTime) {
        menuTime.textContent = vietnamTime;
    }
}

updateMenuTime();

setInterval(updateMenuTime, 1000);


/* =====================================================
   MUSIC PLAYER
===================================================== */

const audio =
    document.getElementById("audio");

const playButton =
    document.getElementById("play-button");

const backwardButton =
    document.getElementById("backward");

const forwardButton =
    document.getElementById("forward");

const progress =
    document.getElementById("music-progress");

const progressBar =
    document.querySelector(".progress-bar");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const repeatButton =
    document.getElementById("repeat-button");

const favoriteButton =
    document.getElementById("favorite-button");


/* =====================================================
   REPEAT
===================================================== */

let repeat = true;

if (audio) {
    audio.loop = true;
}


/* =====================================================
   PLAY / PAUSE
===================================================== */

if (playButton && audio) {

    playButton.addEventListener(
        "click",
        function () {

            if (audio.paused) {

                audio.play().catch(function (error) {

                    console.log(
                        "Không thể phát nhạc:",
                        error
                    );

                });

            } else {

                audio.pause();

            }

        }
    );

}


/* =====================================================
   LÙI 10 GIÂY
===================================================== */

if (backwardButton && audio) {

    backwardButton.addEventListener(
        "click",
        function () {

            audio.currentTime =
                Math.max(
                    0,
                    audio.currentTime - 10
                );

        }
    );

}


/* =====================================================
   TIẾN 10 GIÂY
===================================================== */

if (forwardButton && audio) {

    forwardButton.addEventListener(
        "click",
        function () {

            if (!audio.duration) return;

            audio.currentTime =
                Math.min(
                    audio.duration,
                    audio.currentTime + 10
                );

        }
    );

}


/* =====================================================
   LOAD THỜI LƯỢNG
===================================================== */

if (audio && duration) {

    audio.addEventListener(
        "loadedmetadata",
        function () {

            duration.textContent =
                formatTime(audio.duration);

        }
    );

}


/* =====================================================
   UPDATE PROGRESS
===================================================== */

if (audio && progress && currentTime) {

    audio.addEventListener(
        "timeupdate",
        function () {

            if (!audio.duration) return;

            const percent =
                (audio.currentTime /
                 audio.duration) * 100;

            progress.style.width =
                percent + "%";

            currentTime.textContent =
                formatTime(audio.currentTime);

        }
    );

}


/* =====================================================
   CLICK THANH PROGRESS
===================================================== */

if (progressBar && audio) {

    progressBar.addEventListener(
        "click",
        function (event) {

            if (!audio.duration) return;

            const rect =
                progressBar.getBoundingClientRect();

            const clickPosition =
                event.clientX - rect.left;

            const percentage =
                clickPosition / rect.width;

            audio.currentTime =
                percentage * audio.duration;

        }
    );

}


/* =====================================================
   VOLUME
===================================================== */

if (audio) {

    audio.volume = 1;

}

if (volume && audio) {

    volume.addEventListener(
        "input",
        function () {

            audio.volume =
                Number(volume.value);

        }
    );

}


/* =====================================================
   REPEAT BUTTON
===================================================== */

if (repeatButton && audio) {

    repeatButton.addEventListener(
        "click",
        function () {

            repeat = !repeat;

            audio.loop = repeat;

            if (repeat) {

                repeatButton.classList.add(
                    "active"
                );

            } else {

                repeatButton.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   FAVORITE
===================================================== */

if (favoriteButton) {

    favoriteButton.addEventListener(
        "click",
        function () {

            favoriteButton.classList.toggle(
                "liked"
            );

            if (
                favoriteButton.classList.contains(
                    "liked"
                )
            ) {

                favoriteButton.textContent =
                    "♥";

            } else {

                favoriteButton.textContent =
                    "♡";

            }

        }
    );

}


/* =====================================================
   KHI PLAY
===================================================== */

if (audio && playButton) {

    audio.addEventListener(
        "play",
        function () {

            playButton.textContent =
                "❚❚";

        }
    );

}


/* =====================================================
   KHI PAUSE
===================================================== */

if (audio && playButton) {

    audio.addEventListener(
        "pause",
        function () {

            playButton.textContent =
                "▶";

        }
    );

}


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        String(remainingSeconds)
            .padStart(2, "0")
    );
}


/* =====================================================
   APP WINDOWS
   APP 1 → MEMORIES
   APP 2 → SAFARI
   APP 3 → MESSAGE
   APP 4 → CALENDAR
===================================================== */


/* =====================================================
   LẤY 4 APP
===================================================== */

const appItems =
    document.querySelectorAll(".app-item");


/* =====================================================
   BACKGROUND OVERLAY
===================================================== */

const appOverlay =
    document.getElementById("app-overlay");


/* =====================================================
   LẤY TẤT CẢ CỬA SỔ
===================================================== */

const appWindows =
    document.querySelectorAll(".app-window");


/* =====================================================
   ĐÓNG TẤT CẢ WINDOW
===================================================== */

function closeAllAppWindows() {

    appWindows.forEach(
        function (windowElement) {

            windowElement.classList.remove(
                "open"
            );

        }
    );

}


/* =====================================================
   MỞ WINDOW
===================================================== */

function openAppWindow(windowId) {

    const windowElement =
        document.getElementById(windowId);

    if (!windowElement) {

        console.warn(
            "Không tìm thấy window:",
            windowId
        );

        return;

    }


    /*
       Nếu đang có app khác mở,
       đóng nó trước.
    */

    closeAllAppWindows();


    /*
       Mở app được chọn.
    */

    windowElement.classList.add(
        "open"
    );


    /*
       Bật background blur.
    */

    if (appOverlay) {

        appOverlay.classList.add(
            "active"
        );

    }

}


/* =====================================================
   ĐÓNG WINDOW
===================================================== */

function closeAppWindow(windowId) {

    const windowElement =
        document.getElementById(windowId);

    if (!windowElement) return;


    windowElement.classList.remove(
        "open"
    );


    /*
       Kiểm tra xem còn window nào
       đang mở hay không.
    */

    const anotherWindowIsOpen =
        document.querySelector(
            ".app-window.open"
        );


    /*
       Nếu không còn window nào,
       tắt blur.
    */

    if (
        !anotherWindowIsOpen &&
        appOverlay
    ) {

        appOverlay.classList.remove(
            "active"
        );

    }

}


/* =====================================================
   CLICK 4 APP
===================================================== */

appItems.forEach(
    function (app, index) {

        app.addEventListener(
            "click",
            function (event) {

                /*
                   Ngăn click lan ra ngoài.
                */

                event.stopPropagation();


                /*
                   APP 1 → MEMORIES
                */

                if (index === 0) {

                    openAppWindow(
                        "memories-window"
                    );

                }


                /*
                   APP 2 → SAFARI
                */

                else if (index === 1) {

                    openAppWindow(
                        "safari-window"
                    );

                }


                /*
                   APP 3 → MESSAGE
                */

                else if (index === 2) {

                    openAppWindow(
                        "message-window"
                    );

                }


                /*
                   APP 4 → CALENDAR
                */

                else if (index === 3) {

                    openAppWindow(
                        "calendar-window"
                    );

                }

            }
        );

    }
);


/* =====================================================
   CLICK OVERLAY → ĐÓNG WINDOW
===================================================== */

if (appOverlay) {

    appOverlay.addEventListener(
        "click",
        function () {

            closeAllAppWindows();

            appOverlay.classList.remove(
                "active"
            );

        }
    );

}


/* =====================================================
   NÚT ĐỎ — CLOSE WINDOW
===================================================== */

const closeButtons =
    document.querySelectorAll(
        ".window-close"
    );


closeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                /*
                   Không cho click tiếp tục
                   xuống overlay.
                */

                event.stopPropagation();


                const windowId =
                    button.dataset.window;


                closeAppWindow(
                    windowId
                );

            }
        );

    }
);


/* =====================================================
   NGĂN CLICK TRONG WINDOW
   KHÔNG LÀM TẮT OVERLAY
===================================================== */

appWindows.forEach(
    function (windowElement) {

        windowElement.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }
);


/* =====================================================
   ESC → ĐÓNG WINDOW
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") return;


        closeAllAppWindows();


        if (appOverlay) {

            appOverlay.classList.remove(
                "active"
            );

        }

    }
);

/* =====================================================
   CALENDAR — LOVE COUNTER
   BẮT ĐẦU: 27/02/2024 — 22:00
   MÚI GIỜ: VIỆT NAM
===================================================== */

const loveStart =
    new Date("2024-02-27T22:00:00+07:00");


function updateLoveCounter() {

    const now = new Date();

    let years =
        now.getFullYear() -
        loveStart.getFullYear();

    let months =
        now.getMonth() -
        loveStart.getMonth();

    let days =
        now.getDate() -
        loveStart.getDate();

    let hours =
        now.getHours() -
        loveStart.getHours();

    let minutes =
        now.getMinutes() -
        loveStart.getMinutes();

    let seconds =
        now.getSeconds() -
        loveStart.getSeconds();


    /* =========================
       ĐIỀU CHỈNH GIÁ TRỊ ÂM
    ========================= */

    if (seconds < 0) {

        seconds += 60;
        minutes--;

    }


    if (minutes < 0) {

        minutes += 60;
        hours--;

    }


    if (hours < 0) {

        hours += 24;
        days--;

    }


    if (days < 0) {

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();

        months--;

    }


    if (months < 0) {

        months += 12;
        years--;

    }


    /* =========================
       HIỂN THỊ
    ========================= */

    const yearsElement =
        document.getElementById("love-years");

    const monthsElement =
        document.getElementById("love-months");

    const daysElement =
        document.getElementById("love-days");

    const hoursElement =
        document.getElementById("love-hours");

    const minutesElement =
        document.getElementById("love-minutes");

    const secondsElement =
        document.getElementById("love-seconds");


    if (yearsElement) {
        yearsElement.textContent = years;
    }

    if (monthsElement) {
        monthsElement.textContent = months;
    }

    if (daysElement) {
        daysElement.textContent = days;
    }

    if (hoursElement) {
        hoursElement.textContent = hours;
    }

    if (minutesElement) {
        minutesElement.textContent = minutes;
    }

    if (secondsElement) {
        secondsElement.textContent = seconds;
    }

}


/* =========================
   CHẠY NGAY
========================= */

updateLoveCounter();


/* =========================
   CẬP NHẬT MỖI GIÂY
========================= */

setInterval(
    updateLoveCounter,
    1000
);
