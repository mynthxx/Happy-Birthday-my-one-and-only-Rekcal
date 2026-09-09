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
        function() {

            if (audio.paused) {

                audio.play();

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
        function() {

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
        function() {

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
        function() {

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
        function() {

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
        function(event) {

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
        function() {

            audio.volume =
                volume.value;

        }
    );

}


/* =====================================================
   REPEAT BUTTON
===================================================== */

if (repeatButton && audio) {

    repeatButton.addEventListener(
        "click",
        function() {

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
        function() {

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
        function() {

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
        function() {

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
   MEMORIES / SAFARI / TIN NHẮN / LỊCH
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
   HÀM MỞ WINDOW
===================================================== */

function openAppWindow(windowId) {

    const windowElement =
        document.getElementById(windowId);

    if (!windowElement) return;


    /* Mở cửa sổ */

    windowElement.classList.add("open");


    /* Làm blur background */

    if (appOverlay) {

        appOverlay.classList.add(
            "active"
        );

    }

}


/* =====================================================
   HÀM ĐÓNG WINDOW
===================================================== */

function closeAppWindow(windowId) {

    const windowElement =
        document.getElementById(windowId);

    if (!windowElement) return;


    /* Đóng cửa sổ */

    windowElement.classList.remove(
        "open"
    );


    /* Tắt blur */

    if (appOverlay) {

        appOverlay.classList.remove(
            "active"
        );

    }

}


/* =====================================================
   CLICK 4 APP
===================================================== */

appItems.forEach(
    function(app, index) {

        app.addEventListener(
            "click",
            function(event) {

                /*
                    APP 1 → MEMORIES
                    APP 2 → SAFARI
                    APP 3 → TIN NHẮN
                    APP 4 → LỊCH
                */


                if (index === 0) {

                    openAppWindow(
                        "memories-window"
                    );

                }


                else if (index === 1) {

                    openAppWindow(
                        "safari-window"
                    );

                }


                else if (index === 2) {

                    openAppWindow(
                        "message-window"
                    );

                }


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
        function() {

            const openWindows =
                document.querySelectorAll(
                    ".app-window.open"
                );


            openWindows.forEach(
                function(windowElement) {

                    windowElement.classList.remove(
                        "open"
                    );

                }
            );


            appOverlay.classList.remove(
                "active"
            );

        }
    );

}


/* =====================================================
   NÚT ĐÓNG 🔴
===================================================== */

const closeButtons =
    document.querySelectorAll(
        ".window-close"
    );


closeButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function(event) {

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
