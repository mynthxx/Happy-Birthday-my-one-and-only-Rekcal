/* =========================
   HIỂN THỊ GIỜ VIỆT NAM
========================= */

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

    document.getElementById("menu-time").textContent =
        vietnamTime;
}

updateMenuTime();

setInterval(updateMenuTime, 1000);


/* =========================
   MUSIC PLAYER
========================= */

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


/* =========================
   REPEAT
========================= */

let repeat = true;

audio.loop = true;


/* =========================
   PLAY / PAUSE
========================= */

playButton.addEventListener(
    "click",
    function() {

        if (audio.paused) {

            audio.play();

            playButton.textContent = "❚❚";

        } else {

            audio.pause();

            playButton.textContent = "▶";

        }

    }
);


/* =========================
   LÙI 10 GIÂY
========================= */

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


/* =========================
   TIẾN 10 GIÂY
========================= */

forwardButton.addEventListener(
    "click",
    function() {

        audio.currentTime =
            Math.min(
                audio.duration,
                audio.currentTime + 10
            );

    }
);


/* =========================
   LOAD THỜI LƯỢNG
========================= */

audio.addEventListener(
    "loadedmetadata",
    function() {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* =========================
   UPDATE PROGRESS
========================= */

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


/* =========================
   CLICK THANH PROGRESS
========================= */

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


/* =========================
   VOLUME
========================= */

audio.volume = 1;

volume.addEventListener(
    "input",
    function() {

        audio.volume =
            volume.value;

    }
);


/* =========================
   REPEAT BUTTON
========================= */

repeatButton.addEventListener(
    "click",
    function() {

        repeat = !repeat;

        audio.loop = repeat;

        if (repeat) {

            repeatButton.classList.add("active");

        } else {

            repeatButton.classList.remove("active");

        }

    }
);


/* =========================
   FAVORITE
========================= */

favoriteButton.addEventListener(
    "click",
    function() {

        favoriteButton.classList.toggle("liked");

        if (
            favoriteButton.classList.contains("liked")
        ) {

            favoriteButton.textContent = "♥";

        } else {

            favoriteButton.textContent = "♡";

        }

    }
);


/* =========================
   KHI PLAY
========================= */

audio.addEventListener(
    "play",
    function() {

        playButton.textContent = "❚❚";

    }
);


/* =========================
   KHI PAUSE
========================= */

audio.addEventListener(
    "pause",
    function() {

        playButton.textContent = "▶";

    }
);


/* =========================
   FORMAT TIME
========================= */

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


/* =========================
   LẤY 4 APP ICON
========================= */

const appItems =
    document.querySelectorAll(".app-item");


/* =========================
   HÀM MỞ WINDOW
========================= */

function openAppWindow(windowId) {

    const windowElement =
        document.getElementById(windowId);

    if (!windowElement) return;

    windowElement.classList.add("open");
}


/* =========================
   HÀM ĐÓNG WINDOW
========================= */

function closeAppWindow(windowId) {

    const windowElement =
        document.getElementById(windowId);

    if (!windowElement) return;

    windowElement.classList.remove("open");
}


/* =========================
   CLICK 4 APP
========================= */

appItems.forEach(
    function(app, index) {

        app.addEventListener(
            "click",
            function() {

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


/* =========================
   NÚT ĐÓNG 🔴
========================= */

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

                closeAppWindow(windowId);

            }
        );

    }
);
