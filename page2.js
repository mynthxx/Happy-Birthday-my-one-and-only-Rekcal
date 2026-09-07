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

const progress =
    document.getElementById("music-progress");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");


/* PLAY / PAUSE */

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


/* HIỂN THỊ THỜI LƯỢNG BÀI */

audio.addEventListener(
    "loadedmetadata",
    function() {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* THANH TIẾN TRÌNH */

audio.addEventListener(
    "timeupdate",
    function() {

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progress.style.width =
            percent + "%";

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


/* KHI HẾT BÀI */

audio.addEventListener(
    "ended",
    function() {

        playButton.textContent = "▶";

        progress.style.width = "0%";

        currentTime.textContent = "0:00";

    }
);


/* ĐỔI GIÂY → PHÚT:GIÂY */

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
        String(remainingSeconds).padStart(2, "0")
    );
}
