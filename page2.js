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
   LITTLE CAT HOUSE — COMPACT JS
   Player Storage + Cat House + Cat Closet
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
        closet: $("#closet-screen")
    };

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

    const outfits = [
        { id: "outfit1", src: "outfit1.png", price: 10, name: "Little Bow" },
        { id: "outfit2", src: "outfit2.png", price: 15, name: "Sweet Ribbon" },
        { id: "outfit3", src: "outfit3.png", price: 20, name: "Tiny Hat" },
        { id: "outfit4", src: "outfit4.png", price: 25, name: "Pink Dream" },
        { id: "outfit5", src: "outfit5.png", price: 30, name: "Cozy Look" },
        { id: "outfit6", src: "outfit6.png", price: 35, name: "Berry Cat" },
        { id: "outfit7", src: "outfit7.png", price: 40, name: "Royal Kitty" },
        { id: "outfit8", src: "outfit8.png", price: 50, name: "Princess Cat" }
    ];

    const defaultCat = () => ({
        adopted: false,
        cat: null,
        name: "My little baby",
        hearts: 0,
        happiness: 100,
        hunger: 100,
        cleanliness: 100,
        ownedOutfits: [],
        outfit: null
    });

    function getPlayers() {
        try { return JSON.parse(localStorage.getItem(PLAYERS_KEY)) || []; }
        catch { return []; }
    }

    function savePlayers(players) {
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }

    function activeId() {
        return localStorage.getItem(ACTIVE_KEY);
    }

    function setActiveId(id) {
        localStorage.setItem(ACTIVE_KEY, id);
    }

    function currentPlayer() {
        const players = getPlayers();
        return players.find(p => p.id === activeId()) || null;
    }

    function updateCurrentPlayer(data) {
        const players = getPlayers();
        const i = players.findIndex(p => p.id === activeId());
        if (i < 0) return;
        players[i] = { ...players[i], ...data };
        savePlayers(players);
    }

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

    function makePlayer(name) {
        const players = getPlayers();
        const player = {
            id: "player-" + Date.now() + "-" + Math.random().toString(16).slice(2),
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

    /* PLAYER STORAGE */
    function renderPlayers() {
        const box = $("#player-list");
        if (!box) return;
        const players = getPlayers();
        box.innerHTML = "";

        if (!players.length) {
            box.innerHTML = '<div class="player-empty">Chưa có player nào ♡<br>Tạo player đầu tiên nhé!</div>';
            return;
        }

        players.forEach(player => {
            const game = player.game || defaultCat();
            const card = document.createElement("div");
            card.className = "player-card" + (player.id === activeId() ? " active" : "");
            card.innerHTML = `
                <div class="player-card-cat">🐾</div>
                <div class="player-card-name">${escapeHTML(player.name)}</div>
                <div class="player-card-info">
                    ${game.adopted ? "🐱 " + escapeHTML(game.name) : "🐣 Chưa nhận mèo"}<br>
                    ❤️ ${game.hearts || 0}
                </div>`;
            card.addEventListener("click", () => selectPlayer(player.id));
            box.appendChild(card);
        });
    }

    function selectPlayer(id) {
        setActiveId(id);
        const player = currentPlayer();
        if (!player) return;
        if (player.game && player.game.adopted) {
            showScreen(screens.home);
            updateUI();
        } else {
            showScreen(screens.adopt);
            selectedCat = null;
            $$(".cat-option").forEach(x => x.classList.remove("selected"));
            const btn = $("#adopt-button");
            if (btn) btn.disabled = true;
        }
    }

    $("#new-player-button")?.addEventListener("click", () => {
        const nameScreen = screens.playerName;
        const input = $("#player-name-input");
        if (input) input.value = "";
        showScreen(nameScreen);
        setTimeout(() => input?.focus(), 50);
    });

    function createNewPlayer() {
        const input = $("#player-name-input");
        let name = input?.value.trim() || "";
        if (!name) name = "Player " + nextPlayerNumber();
        makePlayer(name);
        showScreen(screens.adopt);
        selectedCat = null;
    }

    $("#player-name-confirm")?.addEventListener("click", createNewPlayer);
    $("#player-name-input")?.addEventListener("keydown", e => {
        if (e.key === "Enter") createNewPlayer();
    });

    /* CAT ADOPTION */
    let selectedCat = null;

    $$(".cat-option").forEach(option => {
        option.addEventListener("click", () => {
            $$(".cat-option").forEach(x => x.classList.remove("selected"));
            option.classList.add("selected");
            selectedCat = {
                id: option.dataset.cat,
                src: option.dataset.src || option.querySelector("img")?.getAttribute("src") || cats[option.dataset.cat]
            };
            const btn = $("#adopt-button");
            if (btn) btn.disabled = false;
        });
    });

    $("#adopt-button")?.addEventListener("click", () => {
        if (!selectedCat) return alert("Hãy chọn một bé mèo trước nha 🐱");
        const player = currentPlayer();
        if (!player) return;
        player.game = { ...defaultCat(), ...player.game, adopted: true, cat: selectedCat };
        updateCurrentPlayer({ game: player.game });
        const input = $("#cat-name-input");
        if (input) input.value = "";
        showScreen(screens.naming);
    });

    function saveCatName() {
        const player = currentPlayer();
        if (!player) return;
        const input = $("#cat-name-input");
        const name = input?.value.trim() || "My little baby";
        player.game.name = name;
        updateCurrentPlayer({ game: player.game });
        showScreen(screens.home);
        updateUI();
    }

    $("#name-confirm")?.addEventListener("click", saveCatName);
    $("#cat-name-input")?.addEventListener("keydown", e => {
        if (e.key === "Enter") saveCatName();
    });

    /* HOME / ACTIVITIES */
    const actionText = {
        kibble: "Yum yum! Bé ăn no rồi 🍖",
        feed: "Yum yum! Bé ăn no rồi 🍖",
        bath: "Sạch sẽ thơm tho 🛁",
        soup: "Bát súp ấm áp ♡ 🍲",
        play: "Chơi vui quá! 🎀",
        pet: "Bé được nựng rồi ♡",
        sleep: "Ngủ ngon nhé bé 🌙"
    };

    function doAction(button) {
        const player = currentPlayer();
        if (!player || !player.game?.adopted) return;
        const game = player.game;
        const action = button.dataset.action;
        const reward = Math.floor(Math.random() * 4) + 2;

        if (action === "kibble" || action === "feed") game.hunger = Math.min(100, game.hunger + 25);
        if (action === "bath") game.cleanliness = 100;
        if (action === "soup") {
            game.hunger = Math.min(100, game.hunger + 15);
            game.happiness = Math.min(100, game.happiness + 15);
        }
        if (action === "play") game.happiness = Math.min(100, game.happiness + 25);
        if (action === "pet") game.happiness = Math.min(100, game.happiness + 15);
        if (action === "sleep") {
            game.happiness = Math.min(100, game.happiness + 10);
            game.hunger = Math.max(0, game.hunger - 5);
        }

        game.hearts += reward;
        updateCurrentPlayer({ game });
        updateUI();
        showReward(reward);
        const msg = $("#pet-message");
        if (msg) msg.textContent = actionText[action] || "Bé vui lắm ♡";
        button.classList.add("activity-done");
        setTimeout(() => button.classList.remove("activity-done"), 400);
    }

    $$("[data-action]").forEach(button => {
        button.addEventListener("click", () => doAction(button));
    });

    function showReward(amount) {
        const box = $(".cat-game") || document.body;
        const pop = document.createElement("div");
        pop.className = "heart-reward-popup";
        pop.textContent = "+" + amount + " ❤️";
        box.appendChild(pop);
        setTimeout(() => pop.classList.add("show"), 10);
        setTimeout(() => pop.remove(), 1000);
    }

    /* CLOSET */
    function renderCloset() {
        const grid = $("#closet-grid");
        const player = currentPlayer();
        if (!grid || !player) return;
        const game = player.game;
        const owned = game.ownedOutfits || [];
        grid.innerHTML = "";

        outfits.forEach(item => {
            const isOwned = owned.includes(item.id);
            const isWearing = game.outfit?.id === item.id;
            const card = document.createElement("div");
            card.className = "outfit-item" + (isOwned ? " owned" : "") + (isWearing ? " selected" : "");
            card.dataset.outfit = item.id;
            card.dataset.price = item.price;
            card.dataset.src = item.src;
            card.innerHTML = `
                <img src="${item.src}" alt="${item.name}">
                <div>${item.name}</div>
                <small>${isOwned ? (isWearing ? "WEARING ♡" : "OWNED ✓") : item.price + " ❤️"}</small>`;
            card.addEventListener("click", () => buyOrWear(item));
            grid.appendChild(card);
        });
    }

    function buyOrWear(item) {
        const player = currentPlayer();
        if (!player) return;
        const game = player.game;
        game.ownedOutfits ||= [];

        if (!game.ownedOutfits.includes(item.id)) {
            if (game.hearts < item.price) {
                alert("Chưa đủ tim đâu nè 💗\nCần " + item.price + " ❤️ để mua món này.");
                return;
            }
            game.hearts -= item.price;
            game.ownedOutfits.push(item.id);
        }

        game.outfit = { id: item.id, src: item.src };
        updateCurrentPlayer({ game });
        renderCloset();
        updateUI();
    }

    $("#closet-open")?.addEventListener("click", () => {
        renderCloset();
        showScreen(screens.closet);
        updateUI();
    });

    $("#closet-back")?.addEventListener("click", () => {
        showScreen(screens.home);
        updateUI();
    });

    /* PLAYER TOOLS */
    $("#switch-player")?.addEventListener("click", () => {
        renderPlayers();
        showScreen(screens.player);
    });

    $("#rename-player")?.addEventListener("click", () => {
        const player = currentPlayer();
        if (!player) return;
        const newName = prompt("Đổi tên player:", player.name);
        if (newName && newName.trim()) {
            updateCurrentPlayer({ name: newName.trim() });
            updateUI();
        }
    });

    $("#reset-pet")?.addEventListener("click", () => {
        const player = currentPlayer();
        if (!player) return;
        if (!confirm("Reset player hiện tại? Dữ liệu player khác sẽ không bị xoá.")) return;
        player.game = defaultCat();
        updateCurrentPlayer({ game: player.game });
        showScreen(screens.adopt);
        selectedCat = null;
        $$(".cat-option").forEach(x => x.classList.remove("selected"));
        const btn = $("#adopt-button");
        if (btn) btn.disabled = true;
    });

    /* UI */
    function updateUI() {
        const player = currentPlayer();
        if (!player) return;
        const game = player.game || defaultCat();
        const cat = game.cat || {};

        $("#pet-title") && ($("#pet-title").textContent = game.name || "My little baby");
        $("#heart-count") && ($("#heart-count").textContent = game.hearts || 0);
        $("#closet-heart-count") && ($("#closet-heart-count").textContent = game.hearts || 0);

        const sprite = $("#pet-sprite");
        if (sprite) {
            sprite.style.backgroundImage = cat.src ? `url("${cat.src}")` : "none";
            sprite.style.backgroundSize = "contain";
            sprite.style.backgroundPosition = "center";
            sprite.style.backgroundRepeat = "no-repeat";
        }

        const status = $("#pet-status");
        if (status) {
            const avg = ((game.happiness || 0) + (game.hunger || 0) + (game.cleanliness || 0)) / 3;
            status.textContent = avg >= 80 ? "😺 HAPPY" : avg >= 50 ? "😿 OKAY" : "😾 NEED CARE";
        }

        $$(".outfit-item").forEach(item => {
            const id = item.dataset.outfit;
            item.classList.toggle("owned", (game.ownedOutfits || []).includes(id));
            item.classList.toggle("selected", game.outfit?.id === id);
        });
    }

    function escapeHTML(text) {
        return String(text).replace(/[&<>'"]/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
        }[c]));
    }

    /* START */
    const players = getPlayers();
    const id = activeId();

    if (!players.length) {
        showScreen(screens.player);
        renderPlayers();
    } else if (id && currentPlayer()) {
        const player = currentPlayer();
        if (player.game?.adopted) {
            showScreen(screens.home);
            updateUI();
        } else {
            showScreen(screens.adopt);
        }
    } else {
        showScreen(screens.player);
        renderPlayers();
    }

    /* Debug helper */
    window.littleCatHouse = {
        getPlayers,
        currentPlayer,
        addHearts(amount) {
            const p = currentPlayer();
            if (!p) return;
            p.game.hearts = Math.max(0, (p.game.hearts || 0) + Number(amount || 0));
            updateCurrentPlayer({ game: p.game });
            updateUI();
        },
        resetCurrentPlayer() {
            const p = currentPlayer();
            if (!p) return;
            p.game = defaultCat();
            updateCurrentPlayer({ game: p.game });
            showScreen(screens.adopt);
        }
    };
});
