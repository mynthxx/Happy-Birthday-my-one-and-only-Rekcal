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
   APPLE MUSIC
========================= */

const playButton =
    document.getElementById("play-button");


const appleMusicLink =
    "https://music.apple.com/vn/album/back-to-december-taylors-version/1690839749?i=1690840121&l=vi";


/* =========================
   NÚT PLAY
========================= */

playButton.addEventListener(
    "click",
    function() {

        window.open(
            appleMusicLink,
            "_blank"
        );

    }
);
