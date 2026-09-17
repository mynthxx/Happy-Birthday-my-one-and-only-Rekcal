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

/* =====================================================
   LITTLE CAT HOUSE — JS
   Player Storage + Cat House + 25 Message Cards
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".cat-game")) return;

    const $ = s => document.querySelector(s);
    const $$ = s => [...document.querySelectorAll(s)];

    const PLAYERS_KEY = "littleCatHousePlayers";
    const ACTIVE_KEY = "littleCatHouseActivePlayer";

    const screens = {
        player: $("#player-screen"),
        playerName: $("#player-name-screen"),
        adopt: $("#adopt-screen"),
        naming: $("#naming-screen"),
        home: $("#home-screen"),
        message: $("#message-screen")
    };

    /* =====================================================
       CATS
       ===================================================== */

    const cats = {
        black: "cat-black.png",
        calico: "cat-calico.png",
        graywhite: "cat-graywhite.png",
        orange: "cat-orange.png",
        siamese: "cat-siamese.png",
        tri: "cat-tri.png",
        tuxedo: "cat-tuxedo.png",
        white: "cat-white.png"
    };


    /* =====================================================
       25 MESSAGE CARDS
       
       Sau này mình sẽ chỉnh lại tên file ảnh
       cho đúng với HTML / folder của bạn.
       ===================================================== */

    const messageCards = [

        {
            id: 1,
            src: "tarot-01.png",
            name: "THE LOVERS",
            note: "Có những ngày bạn không cần phải làm điều gì thật đặc biệt. Chỉ cần là chính mình thôi, vì bạn đã đủ tuyệt vời rồi. ♡"
        },

        {
            id: 2,
            src: "tarot-02.png",
            name: "THE CHARIOT",
            note: "Bạn đang đi đúng hướng. Cứ chậm thôi cũng được, miễn là bạn vẫn đang tiến về phía những điều mình mong muốn. 🌷"
        },

        {
            id: 3,
            src: "tarot-03.png",
            name: "JUSTICE",
            note: "Đừng quá khắt khe với bản thân. Bạn cũng xứng đáng nhận được sự dịu dàng mà bạn vẫn dành cho người khác. ♡"
        },

        {
            id: 4,
            src: "tarot-04.png",
            name: "THE MOON",
            note: "Nếu hôm nay mọi thứ hơi mơ hồ, không sao cả. Có những điều đẹp đẽ cần một chút thời gian mới nhìn thấy được. 🌙"
        },

        {
            id: 5,
            src: "tarot-05.png",
            name: "THE SUN",
            note: "Mong hôm nay có thật nhiều điều nhỏ xíu làm bạn mỉm cười. Bạn là một phần rất ấm áp trong thế giới này. ☀️"
        },

        {
            id: 6,
            src: "tarot-06.png",
            name: "JUDGEMENT",
            note: "Bạn không cần phải mãi là phiên bản của ngày hôm qua. Bạn luôn có thể bắt đầu lại, nhẹ nhàng hơn và yêu bản thân hơn. ♡"
        },

        {
            id: 7,
            src: "tarot-07.png",
            name: "THE HERMIT",
            note: "Nếu cần nghỉ một chút thì cứ nghỉ. Không phải lúc nào bạn cũng phải mạnh mẽ hay vui vẻ. Mình vẫn ở đây. 🫶"
        },

        {
            id: 8,
            src: "tarot-08.png",
            name: "WHEEL OF FORTUNE",
            note: "Một điều bất ngờ dễ thương có thể đang trên đường đến với bạn. Hãy để dành một chút chỗ cho những niềm vui bất ngờ nhé. ✨"
        },

        {
            id: 9,
            src: "tarot-09.png",
            name: "STRENGTH",
            note: "Sự dịu dàng của bạn cũng là một dạng sức mạnh. Đừng bao giờ nghĩ rằng trái tim mềm mại là một điều yếu đuối. ♡"
        },

        {
            id: 10,
            src: "tarot-10.png",
            name: "THE HANGED MAN",
            note: "Đôi khi đứng yên một chút cũng là một phần của hành trình. Hít thở, nghỉ ngơi, rồi mình đi tiếp. 🌿"
        },

        {
            id: 11,
            src: "tarot-11.png",
            name: "DEATH",
            note: "Có những điều cũ cần được khép lại để nhường chỗ cho điều mới. Mong chương tiếp theo của bạn thật dịu dàng. 🌸"
        },

        {
            id: 12,
            src: "tarot-12.png",
            name: "TEMPERANCE",
            note: "Không cần vội. Những điều tốt đẹp thường đến vừa đủ, đúng lúc và theo cách mà bạn không ngờ tới. 🫧"
        },

        {
            id: 13,
            src: "tarot-13.png",
            name: "THE DEVIL",
            note: "Đừng để những suy nghĩ tiêu cực giữ chân bạn. Bạn không phải những điều khiến bạn nghi ngờ chính mình. ❤️"
        },

        {
            id: 14,
            src: "tarot-14.png",
            name: "THE TOWER",
            note: "Nếu có chuyện không như ý, hãy nhớ rằng một cánh cửa đóng lại không có nghĩa là mọi con đường đều biến mất. ♡"
        },

        {
            id: 15,
            src: "tarot-15.png",
            name: "THE STAR",
            note: "Hãy giữ lại một chút hy vọng cho những ngày phía trước. Có rất nhiều điều đẹp đẽ mà bạn chưa gặp đâu. ⭐"
        },

        {
            id: 16,
            src: "tarot-16.png",
            name: "THE EMPRESS",
            note: "Bạn xứng đáng được yêu thương, được chăm sóc và được nuông chiều một chút. Hôm nay nhớ thương mình nhé. 🌷"
        },

        {
            id: 17,
            src: "tarot-17.png",
            name: "THE EMPEROR",
            note: "Bạn có thể mạnh mẽ mà không cần phải gồng mình. Cho phép bản thân được dựa vào ai đó khi cần nhé. ♡"
        },

        {
            id: 18,
            src: "tarot-18.png",
            name: "THE HIEROPHANT",
            note: "Những điều giản dị và chân thành thường là những điều ở lại lâu nhất. Hãy trân trọng những người thật lòng với bạn. 🕊️"
        },

        {
            id: 19,
            src: "tarot-19.png",
            name: "THE FOOL",
            note: "Có thể hôm nay là một ngày thích hợp để thử một điều mới. Không cần hoàn hảo, chỉ cần vui một chút thôi. 🎀"
        },

        {
            id: 20,
            src: "tarot-20.png",
            name: "THE MAGICIAN",
            note: "Bạn có nhiều khả năng hơn bạn nghĩ. Tin vào bản thân thêm một chút nhé — bạn làm được nhiều điều lắm. ✨"
        },

        {
            id: 21,
            src: "tarot-21.png",
            name: "THE HIGH PRIESTESS",
            note: "Hãy lắng nghe cảm giác của mình. Đôi khi trái tim đã biết câu trả lời trước cả khi chúng ta kịp gọi tên nó. 🌙"
        },

        {
            id: 22,
            src: "tarot-22.png",
            name: "THE WORLD",
            note: "Bạn đã đi xa hơn bạn tưởng. Nhìn lại một chút đi — có rất nhiều điều đáng để bạn tự hào về mình. 🌎"
        },

        {
            id: 23,
            src: "tarot-23.png",
            name: "A LITTLE WISH",
            note: "Ước một điều nho nhỏ đi. Biết đâu vũ trụ hôm nay đang rất rảnh để chiều bạn đó. ♡✨"
        },

        {
            id: 24,
            src: "tarot-24.png",
            name: "A LITTLE LOVE",
            note: "Có một người luôn mong bạn có một ngày thật vui, ăn uống đầy đủ và ngủ thật ngon. Người đó thương bạn nhiều lắm. ❤️"
        },

        {
            id: 25,
            src: "tarot-25.png",
            name: "YOUR SPECIAL MESSAGE",
            note: "Nếu bạn đang đọc được lá bài này, thì đây là lời nhắc nhỏ: bạn rất đặc biệt, và bạn được yêu nhiều hơn bạn nghĩ. 🐾"
        }

    ];


    /* =====================================================
       DEFAULT GAME
       ===================================================== */

    const defaultCat = () => ({

        adopted: false,

        cat: null,

        name: "My little baby",

        hearts: 0,

        happiness: 100,

        hunger: 100,

        cleanliness: 100

    });


    /* =====================================================
       PLAYER STORAGE
       ===================================================== */

    function getPlayers() {

        try {

            return JSON.parse(
                localStorage.getItem(PLAYERS_KEY)
            ) || [];

        } catch {

            return [];

        }

    }


    function savePlayers(players) {

        localStorage.setItem(
            PLAYERS_KEY,
            JSON.stringify(players)
        );

    }


    function activeId() {

        return localStorage.getItem(
            ACTIVE_KEY
        );

    }


    function setActiveId(id) {

        localStorage.setItem(
            ACTIVE_KEY,
            id
        );

    }


    function currentPlayer() {

        return getPlayers().find(
            p => p.id === activeId()
        ) || null;

    }


    function updateCurrentPlayer(data) {

        const players = getPlayers();

        const i = players.findIndex(
            p => p.id === activeId()
        );

        if (i < 0) return;

        players[i] = {
            ...players[i],
            ...data
        };

        savePlayers(players);

    }


    /* =====================================================
       SCREEN
       ===================================================== */

    function showScreen(screen) {

        Object.values(screens).forEach(s => {

            if (!s) return;

            s.classList.add("hidden");

            s.classList.remove("active");

            s.style.display = "none";

        });


        if (!screen) return;


        screen.classList.remove("hidden");

        screen.classList.add("active");

        screen.style.display = "block";

    }


    /* =====================================================
       CREATE PLAYER
       ===================================================== */

    function makePlayer(name) {

        const players = getPlayers();

        const player = {

            id:
                "player-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(16)
                    .slice(2),

            name: name,

            createdAt: Date.now(),

            game: defaultCat()

        };


        players.push(player);

        savePlayers(players);

        setActiveId(player.id);

        return player;

    }


    function nextPlayerNumber() {

        return getPlayers().length + 1;

    }


    /* =====================================================
       PLAYER LIST
       ===================================================== */

    function renderPlayers() {

        const box = $("#player-list");

        if (!box) return;


        const players = getPlayers();

        box.innerHTML = "";


        if (!players.length) {

            box.innerHTML =
                '<div class="player-empty">' +
                'Chưa có player nào ♡<br>' +
                'Tạo player đầu tiên nhé!' +
                '</div>';

            return;

        }


        players.forEach(player => {

            const game =
                player.game ||
                defaultCat();


            const card =
                document.createElement("div");


            card.className =
                "player-card" +
                (
                    player.id === activeId()
                        ? " active"
                        : ""
                );


            card.innerHTML = `

                <div class="player-card-cat">
                    🐾
                </div>

                <div class="player-card-name">
                    ${escapeHTML(player.name)}
                </div>

                <div class="player-card-info">

                    ${
                        game.adopted
                            ? "🐱 " +
                              escapeHTML(game.name)
                            : "🐣 Chưa nhận mèo"
                    }

                    <br>

                    ❤️ ${game.hearts || 0}

                </div>

            `;


            card.addEventListener(
                "click",
                () => selectPlayer(player.id)
            );


            box.appendChild(card);

        });

    }


    function selectPlayer(id) {

        setActiveId(id);


        const player =
            currentPlayer();


        if (!player) return;


        if (
            player.game &&
            player.game.adopted
        ) {

            showScreen(
                screens.home
            );

            updateUI();

        } else {

            showScreen(
                screens.adopt
            );


            selectedCat = null;


            $$(".cat-option")
                .forEach(x => {

                    x.classList.remove(
                        "selected"
                    );

                });


            const btn =
                $("#adopt-button");


            if (btn) {
                btn.disabled = true;
            }

        }

    }


    /* =====================================================
       NEW PLAYER
       ===================================================== */

    $("#new-player-button")
        ?.addEventListener(
            "click",
            () => {

                const input =
                    $("#player-name-input");


                if (input) {
                    input.value = "";
                }


                showScreen(
                    screens.playerName
                );


                setTimeout(
                    () => input?.focus(),
                    50
                );

            }
        );


    function createNewPlayer() {

        const input =
            $("#player-name-input");


        let name =
            input?.value.trim() ||
            "";


        if (!name) {

            name =
                "Player " +
                nextPlayerNumber();

        }


        makePlayer(name);


        showScreen(
            screens.adopt
        );


        selectedCat = null;

    }


    $("#player-name-confirm")
        ?.addEventListener(
            "click",
            createNewPlayer
        );


    $("#player-name-input")
        ?.addEventListener(
            "keydown",
            e => {

                if (e.key === "Enter") {

                    createNewPlayer();

                }

            }
        );


    /* =====================================================
       CAT ADOPTION
       ===================================================== */

    let selectedCat = null;


    $$(".cat-option")
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    $$(".cat-option")
                        .forEach(x => {

                            x.classList.remove(
                                "selected"
                            );

                        });


                    option.classList.add(
                        "selected"
                    );


                    selectedCat = {

                        id:
                            option.dataset.cat,

                        src:
                            option.dataset.src ||
                            option
                                .querySelector("img")
                                ?.getAttribute("src") ||
                            cats[
                                option.dataset.cat
                            ]

                    };


                    const btn =
                        $("#adopt-button");


                    if (btn) {
                        btn.disabled = false;
                    }

                }
            );

        });


    $("#adopt-button")
        ?.addEventListener(
            "click",
            () => {

                if (!selectedCat) {

                    alert(
                        "Hãy chọn một bé mèo trước nha 🐱"
                    );

                    return;

                }


                const player =
                    currentPlayer();


                if (!player) return;


                player.game = {

                    ...defaultCat(),

                    ...player.game,

                    adopted: true,

                    cat: selectedCat

                };


                updateCurrentPlayer({
                    game: player.game
                });


                const input =
                    $("#cat-name-input");


                if (input) {
                    input.value = "";
                }


                showScreen(
                    screens.naming
                );

            }
        );


    /* =====================================================
       CAT NAME
       ===================================================== */

    function saveCatName() {

        const player =
            currentPlayer();


        if (!player) return;


        const input =
            $("#cat-name-input");


        player.game.name =
            input?.value.trim() ||
            "My little baby";


        updateCurrentPlayer({
            game: player.game
        });


        showScreen(
            screens.home
        );


        updateUI();

    }


    $("#name-confirm")
        ?.addEventListener(
            "click",
            saveCatName
        );


    $("#cat-name-input")
        ?.addEventListener(
            "keydown",
            e => {

                if (e.key === "Enter") {

                    saveCatName();

                }

            }
        );


    /* =====================================================
       HOME / ACTIVITIES
       ===================================================== */

    const actionText = {

        kibble:
            "Yum yum! Bé ăn no rồi 🍖",

        feed:
            "Yum yum! Bé ăn no rồi 🍖",

        bath:
            "Sạch sẽ thơm tho 🛁",

        soup:
            "Bát súp ấm áp ♡ 🍲",

        play:
            "Chơi vui quá! 🎀",

        pet:
            "Bé được nựng rồi ♡",

        sleep:
            "Ngủ ngon nhé bé 🌙"

    };


    function doAction(button) {

        const player =
            currentPlayer();


        if (
            !player ||
            !player.game?.adopted
        ) {
            return;
        }


        const game =
            player.game;


        const action =
            button.dataset.action;


        const reward =
            Math.floor(
                Math.random() * 4
            ) + 2;


        if (
            action === "kibble" ||
            action === "feed"
        ) {

            game.hunger =
                Math.min(
                    100,
                    game.hunger + 25
                );

        }


        if (action === "bath") {

            game.cleanliness =
                100;

        }


        if (action === "soup") {

            game.hunger =
                Math.min(
                    100,
                    game.hunger + 15
                );


            game.happiness =
                Math.min(
                    100,
                    game.happiness + 15
                );

        }


        if (action === "play") {

            game.happiness =
                Math.min(
                    100,
                    game.happiness + 25
                );

        }


        if (action === "pet") {

            game.happiness =
                Math.min(
                    100,
                    game.happiness + 15
                );

        }


        if (action === "sleep") {

            game.happiness =
                Math.min(
                    100,
                    game.happiness + 10
                );


            game.hunger =
                Math.max(
                    0,
                    game.hunger - 5
                );

        }


        game.hearts += reward;


        updateCurrentPlayer({
            game: game
        });


        updateUI();


        showReward(reward);


        const msg =
            $("#pet-message");


        if (msg) {

            msg.textContent =
                actionText[action] ||
                "Bé vui lắm ♡";

        }


        button.classList.add(
            "activity-done"
        );


        setTimeout(
            () => {

                button.classList.remove(
                    "activity-done"
                );

            },
            400
        );

    }


    $$("[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => doAction(button)
            );

        });


    function showReward(amount) {

        const box =
            $(".cat-game") ||
            document.body;


        const pop =
            document.createElement(
                "div"
            );


        pop.className =
            "heart-reward-popup";


        pop.textContent =
            "+" +
            amount +
            " ❤️";


        box.appendChild(pop);


        setTimeout(
            () => {

                pop.classList.add(
                    "show"
                );

            },
            10
        );


        setTimeout(
            () => {

                pop.remove();

            },
            1000
        );

    }


    /* =====================================================
       25 MESSAGE CARDS
       ===================================================== */

    let messageBusy = false;


    function renderMessageCards() {

        const grid =
            $("#message-grid");


        if (!grid) return;


        grid.innerHTML = "";


        messageCards.forEach(
            cardData => {

                const card =
                    document.createElement(
                        "button"
                    );


                card.type =
                    "button";


                card.className =
                    "message-card";


                card.dataset.cardId =
                    cardData.id;


                card.innerHTML = `

                    <span class="message-card-inner">

                        <span class="message-card-front">

                            <img
                                src="card-back.png"
                                alt="Mystery card"
                            >

                        </span>


                        <span class="message-card-back">

                            <img
                                src="${cardData.src}"
                                alt="${escapeHTML(
                                    cardData.name
                                )}"
                            >

                        </span>

                    </span>

                `;


                card.addEventListener(
                    "click",
                    () => {

                        drawMessage(card);

                    }
                );


                grid.appendChild(card);

            }
        );

    }


    /* =====================================================
       DRAW MESSAGE
       ===================================================== */

    function drawMessage(clickedCard) {

        if (messageBusy) return;


        const player =
            currentPlayer();


        if (
            !player ||
            !player.game?.adopted
        ) {
            return;
        }


        const game =
            player.game;


        const cost = 100;


        if (
            (game.hearts || 0) <
            cost
        ) {

            alert(
                "Chưa đủ tim đâu nè 💗\n\n" +
                "Cần 100 ❤️ để nhận một thông điệp."
            );

            return;

        }


        messageBusy = true;


        /* Trừ 100 tim */

        game.hearts -= cost;


        updateCurrentPlayer({
            game: game
        });


        updateUI();


        /* Random 1 trong 25 lá */

        const randomIndex =
            Math.floor(
                Math.random() *
                messageCards.length
            );


        const result =
            messageCards[randomIndex];


        /* Đổi ảnh mặt trước thành lá được random */

        const backImage =
            clickedCard.querySelector(
                ".message-card-back img"
            );


        if (backImage) {

            backImage.src =
                result.src;


            backImage.alt =
                result.name;

        }


        /* Hiệu ứng lật */

        clickedCard.classList.add(
            "is-flipped"
        );


        /*
         * Chờ hiệu ứng lật xong
         * rồi mới hiện note.
         */

        setTimeout(
            () => {

                showMessageNote(
                    result,
                    clickedCard
                );

            },
            750
        );

    }


    /* =====================================================
       MESSAGE NOTE
       ===================================================== */

    function showMessageNote(
        card,
        flippedCard
    ) {

        const player =
            currentPlayer();


        const playerName =
            player?.name ||
            "bé";


        alert(

            "🐾 Little Cat House says\n\n" +

            card.name +

            "\n\n" +

            card.note +

            "\n\n" +

            "Một thông điệp nhỏ dành riêng cho " +

            playerName +

            " ♡"

        );


        messageBusy = false;


        /*
         * Đóng popup xong,
         * lá bài quay lại mặt sau.
         */

        if (flippedCard) {

            flippedCard.classList.remove(
                "is-flipped"
            );

        }

    }


    /* =====================================================
       OPEN MESSAGE SCREEN
       ===================================================== */

    $("#message-open")
        ?.addEventListener(
            "click",
            () => {

                renderMessageCards();

                messageBusy = false;

                showScreen(
                    screens.message
                );

                updateUI();

            }
        );


    /* =====================================================
       BACK HOME
       ===================================================== */

    $("#message-back")
        ?.addEventListener(
            "click",
            () => {

                showScreen(
                    screens.home
                );

                updateUI();

            }
        );


    /* =====================================================
       PLAYER TOOLS
       ===================================================== */

    $("#switch-player")
        ?.addEventListener(
            "click",
            () => {

                renderPlayers();

                showScreen(
                    screens.player
                );

            }
        );


    $("#rename-player")
        ?.addEventListener(
            "click",
            () => {

                const player =
                    currentPlayer();


                if (!player) return;


                const newName =
                    prompt(
                        "Đổi tên player:",
                        player.name
                    );


                if (
                    newName &&
                    newName.trim()
                ) {

                    updateCurrentPlayer({
                        name:
                            newName.trim()
                    });


                    updateUI();

                }

            }
        );


    /* =====================================================
       RESET CURRENT PLAYER
       ===================================================== */

    $("#reset-pet")
        ?.addEventListener(
            "click",
            () => {

                const player =
                    currentPlayer();


                if (!player) return;


                if (
                    !confirm(
                        "Reset player hiện tại?\n\n" +
                        "Dữ liệu player khác sẽ không bị xoá."
                    )
                ) {
                    return;
                }


                player.game =
                    defaultCat();


                updateCurrentPlayer({
                    game: player.game
                });


                showScreen(
                    screens.adopt
                );


                selectedCat = null;


                $$(".cat-option")
                    .forEach(x => {

                        x.classList.remove(
                            "selected"
                        );

                    });


                const btn =
                    $("#adopt-button");


                if (btn) {

                    btn.disabled =
                        true;

                }

            }
        );


    /* =====================================================
       UI
       ===================================================== */

    function updateUI() {

        const player =
            currentPlayer();


        if (!player) return;


        const game =
            player.game ||
            defaultCat();


        const cat =
            game.cat || {};


        if ($("#pet-title")) {

            $("#pet-title").textContent =
                game.name ||
                "My little baby";

        }


        if ($("#heart-count")) {

            $("#heart-count").textContent =
                game.hearts || 0;

        }


        if ($("#message-heart-count")) {

            $("#message-heart-count").textContent =
                game.hearts || 0;

        }


        const sprite =
            $("#pet-sprite");


        if (sprite) {

            sprite.style.backgroundImage =
                cat.src
                    ? `url("${cat.src}")`
                    : "none";


            sprite.style.backgroundSize =
                "contain";


            sprite.style.backgroundPosition =
                "center";


            sprite.style.backgroundRepeat =
                "no-repeat";

        }


        const status =
            $("#pet-status");


        if (status) {

            const avg =
                (
                    (game.happiness || 0) +
                    (game.hunger || 0) +
                    (game.cleanliness || 0)
                ) / 3;


            status.textContent =

                avg >= 80
                    ? "😺 HAPPY"

                    : avg >= 50
                        ? "😿 OKAY"

                        : "😾 NEED CARE";

        }

    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(text) {

        return String(text).replace(

            /[&<>'"]/g,

            c => ({

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                "'": "&#39;",

                '"': "&quot;"

            }[c])

        );

    }


    /* =====================================================
       START
       ===================================================== */

    const players =
        getPlayers();


    const id =
        activeId();


    if (!players.length) {

        showScreen(
            screens.player
        );

        renderPlayers();

    }

    else if (
        id &&
        currentPlayer()
    ) {

        const player =
            currentPlayer();


        if (
            player.game?.adopted
        ) {

            showScreen(
                screens.home
            );

            updateUI();

        }

        else {

            showScreen(
                screens.adopt
            );

        }

    }

    else {

        showScreen(
            screens.player
        );

        renderPlayers();

    }


    /* =====================================================
       DEBUG HELPER
       ===================================================== */

    window.littleCatHouse = {

        getPlayers,

        currentPlayer,


        addHearts(amount) {

            const p =
                currentPlayer();


            if (!p) return;


            p.game.hearts =
                Math.max(

                    0,

                    (p.game.hearts || 0) +
                    Number(amount || 0)

                );


            updateCurrentPlayer({
                game: p.game
            });


            updateUI();

        },


        resetCurrentPlayer() {

            const p =
                currentPlayer();


            if (!p) return;


            p.game =
                defaultCat();


            updateCurrentPlayer({
                game: p.game
            });


            showScreen(
                screens.adopt
            );

        }

    };

});
