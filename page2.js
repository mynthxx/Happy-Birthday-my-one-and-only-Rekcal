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
   LITTLE CAT HOUSE — SAFARI MINI GAME
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /*
     * Nếu trang hiện tại không phải Little Cat House
     * thì không chạy phần game này.
     */
    const hasCatGame =
        document.querySelector(".cat-game") ||
        document.querySelector("#adopt-button") ||
        document.querySelector(".cat-option") ||
        document.querySelector("[data-cat]");

    if (!hasCatGame) return;


    /* =====================================================
       STORAGE
    ===================================================== */

    const STORAGE_KEY = "littleCatHouse";


    const defaultState = {
        adopted: false,
        cat: null,
        name: "My little baby",
        hearts: 0,
        outfit: null,
        happiness: 100,
        hunger: 100,
        cleanliness: 100
    };


    let state = loadState();


    function loadState() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return {
                    ...defaultState
                };
            }

            return {
                ...defaultState,
                ...JSON.parse(saved)
            };

        } catch (error) {

            console.warn(
                "Không thể đọc dữ liệu Little Cat House.",
                error
            );

            return {
                ...defaultState
            };
        }
    }


    function saveState() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );
    }


    /* =====================================================
       ELEMENT HELPERS
    ===================================================== */

    function $(selector) {
        return document.querySelector(selector);
    }


    function $all(selector) {
        return document.querySelectorAll(selector);
    }


    function setText(selector, value) {

        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    }


    /* =====================================================
       MAIN ELEMENTS
    ===================================================== */

    const catImage =
        $("#cat-image") ||
        $(".cat-image");

    const catName =
        $("#cat-name") ||
        $(".cat-name");

    const heartCount =
        $("#heart-count") ||
        $(".heart-count");

    const happiness =
        $("#happiness") ||
        $(".happiness");

    const hunger =
        $("#hunger") ||
        $(".hunger");

    const cleanliness =
        $("#cleanliness") ||
        $(".cleanliness");


    /* =====================================================
       SCREEN / SECTION
    ===================================================== */

    const adoptScreen =
        $("#adopt-screen") ||
        $(".adopt-screen");

    const namingScreen =
        $("#naming-screen") ||
        $(".naming-screen");

    const homeScreen =
        $("#home-screen") ||
        $(".home-screen");

    const closetScreen =
        $("#closet-screen") ||
        $(".closet-screen");


    function showScreen(screen) {

        const screens = [
            adoptScreen,
            namingScreen,
            homeScreen,
            closetScreen
        ];

        screens.forEach(function (item) {

            if (!item) return;

            item.classList.remove("active");
            item.style.display = "none";
        });


        if (!screen) return;


        screen.classList.add("active");
        screen.style.display = "";
    }


    /* =====================================================
       CAT DATA
    ===================================================== */

    /*
     * HTML có thể dùng:
     *
     * <div class="cat-option" data-cat="white" data-src="cat1.png">
     *
     * hoặc:
     *
     * <img class="cat-option"
     *      data-cat="white"
     *      src="cat1.png">
     *
     * JS sẽ tự đọc data-src.
     */


    let selectedCat = state.cat;


    function getCatSource(element) {

        if (!element) return null;


        /*
         * Nếu chính element là img
         */
        if (
            element.tagName &&
            element.tagName.toLowerCase() === "img"
        ) {
            return (
                element.dataset.src ||
                element.getAttribute("src")
            );
        }


        /*
         * Nếu bên trong có img
         */
        const image =
            element.querySelector("img");


        if (image) {

            return (
                element.dataset.src ||
                image.dataset.src ||
                image.getAttribute("src")
            );
        }


        return element.dataset.src || null;
    }


    function getCatId(element) {

        if (!element) return null;


        return (
            element.dataset.cat ||
            element.dataset.catId ||
            element.dataset.id ||
            element.getAttribute("data-cat") ||
            null
        );
    }


    /* =====================================================
       CAT SELECTION
    ===================================================== */

    const catOptions =
        $all(".cat-option");


    catOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                catOptions.forEach(function (item) {
                    item.classList.remove("selected");
                });


                option.classList.add("selected");


                selectedCat = {

                    id:
                        getCatId(option),

                    src:
                        getCatSource(option)
                };


                /*
                 * Nếu có ảnh preview
                 */
                if (catImage && selectedCat.src) {

                    catImage.src =
                        selectedCat.src;
                }


                /*
                 * Cho nút ADOPT hoạt động
                 */
                const adoptButton =
                    $("#adopt-button") ||
                    $("#adopt-btn") ||
                    $(".adopt-button");


                if (adoptButton) {

                    adoptButton.disabled = false;

                    adoptButton.classList.add(
                        "ready"
                    );
                }
            }
        );
    });


    /* =====================================================
       ADOPT
    ===================================================== */

    const adoptButton =
        $("#adopt-button") ||
        $("#adopt-btn") ||
        $(".adopt-button");


    if (adoptButton) {

        adoptButton.addEventListener(
            "click",
            function () {

                if (!selectedCat) {

                    alert(
                        "Hãy chọn một bé mèo trước nha 🐱"
                    );

                    return;
                }


                state.cat =
                    selectedCat;

                state.adopted =
                    true;


                saveState();


                /*
                 * Sang màn đặt tên
                 */
                showScreen(namingScreen);
            }
        );
    }


    /* =====================================================
       NAME PET
    ===================================================== */

    const nameInput =
        $("#pet-name-input") ||
        $("#pet-name") ||
        $(".pet-name-input");


    const nameButton =
        $("#name-button") ||
        $("#name-btn") ||
        $(".name-button");


    function savePetName() {

        if (!nameInput) return;


        let name =
            nameInput.value.trim();


        if (!name) {

            name = "My little baby";
        }


        state.name = name;


        saveState();


        updateUI();


        showScreen(homeScreen);
    }


    if (nameButton) {

        nameButton.addEventListener(
            "click",
            savePetName
        );
    }


    if (nameInput) {

        nameInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    savePetName();
                }
            }
        );
    }


    /* =====================================================
       HEARTS
    ===================================================== */

    function addHearts(amount) {

        amount =
            Number(amount) || 0;


        state.hearts += amount;


        saveState();


        updateUI();


        showReward(amount);
    }


    function showReward(amount) {

        /*
         * Tìm khu vực game
         */
        const container =
            $(".cat-game") ||
            document.body;


        const reward =
            document.createElement("div");


        reward.className =
            "heart-reward-popup";


        reward.textContent =
            "+" + amount + " ❤️";


        container.appendChild(reward);


        setTimeout(function () {

            reward.classList.add("show");

        }, 10);


        setTimeout(function () {

            reward.remove();

        }, 1000);
    }


    /* =====================================================
       ACTIVITIES
    ===================================================== */

    /*
     * HTML có thể dùng:
     *
     * <button data-action="feed" data-reward="2">
     *
     * hoặc:
     *
     * <button id="feed-button">
     */


    const activityButtons =
        $all("[data-action]");


    function performActivity(
        action,
        button
    ) {

        let reward =
            Number(
                button.dataset.reward
            );


        /*
         * Nếu HTML không ghi reward
         * thì random 2 → 5
         */
        if (
            !Number.isFinite(reward) ||
            reward <= 0
        ) {

            reward =
                Math.floor(
                    Math.random() * 4
                ) + 2;
        }


        /* =========================
           CHO ĂN
        ========================= */

        if (action === "feed") {

            state.hunger =
                Math.min(
                    100,
                    state.hunger + 25
                );
        }


        /* =========================
           TẮM
        ========================= */

        else if (action === "bath") {

            state.cleanliness =
                100;
        }


        /* =========================
           SÚP THƯỞNG
        ========================= */

        else if (action === "soup") {

            state.hunger =
                Math.min(
                    100,
                    state.hunger + 15
                );

            state.happiness =
                Math.min(
                    100,
                    state.happiness + 15
                );
        }


        /* =========================
           CHƠI
        ========================= */

        else if (action === "play") {

            state.happiness =
                Math.min(
                    100,
                    state.happiness + 25
                );
        }


        /* =========================
           NỰNG
        ========================= */

        else if (action === "pet") {

            state.happiness =
                Math.min(
                    100,
                    state.happiness + 15
                );
        }


        /* =========================
           NGỦ
        ========================= */

        else if (action === "sleep") {

            state.happiness =
                Math.min(
                    100,
                    state.happiness + 10
                );

            state.hunger =
                Math.max(
                    0,
                    state.hunger - 5
                );
        }


        addHearts(reward);


        /*
         * Animation nút
         */
        button.classList.add("activity-done");


        setTimeout(function () {

            button.classList.remove(
                "activity-done"
            );

        }, 400);
    }


    activityButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset.action;


                    if (!action) return;


                    performActivity(
                        action,
                        button
                    );
                }
            );
        }
    );


    /* =====================================================
       SUPPORT OLD BUTTON IDs
       Nếu HTML đang dùng ID riêng
    ===================================================== */

    const oldActivities = {

        "#feed-button": "feed",
        "#bath-button": "bath",
        "#soup-button": "soup",
        "#play-button": "play",
        "#pet-button": "pet",
        "#sleep-button": "sleep",

        "#feed-cat": "feed",
        "#bath-cat": "bath",
        "#give-soup": "soup",
        "#play-cat": "play",
        "#pet-cat": "pet",
        "#sleep-cat": "sleep"
    };


    Object.entries(oldActivities)
        .forEach(function ([selector, action]) {

            const button = $(selector);


            if (!button) return;


            /*
             * Không gắn trùng nếu button
             * đã có data-action
             */
            if (button.dataset.action) return;


            button.addEventListener(
                "click",
                function () {

                    performActivity(
                        action,
                        button
                    );
                }
            );
        });


    /* =====================================================
       CLOSET
    ===================================================== */

    const closetButton =
        $("#closet-button") ||
        $("#cat-closet-button") ||
        $(".closet-button");


    const backHomeButton =
        $("#back-home") ||
        $("#home-button") ||
        $(".back-home");


    if (closetButton) {

        closetButton.addEventListener(
            "click",
            function () {

                showScreen(closetScreen);

                updateUI();
            }
        );
    }


    if (backHomeButton) {

        backHomeButton.addEventListener(
            "click",
            function () {

                showScreen(homeScreen);

                updateUI();
            }
        );
    }


    /* =====================================================
       OUTFITS
    ===================================================== */

    const outfitItems =
        $all(".outfit-item");


    function getOutfitPrice(item) {

        const price =
            Number(
                item.dataset.price
            );


        if (
            Number.isFinite(price) &&
            price >= 0
        ) {

            return price;
        }


        return 10;
    }


    function getOutfitId(item) {

        return (
            item.dataset.outfit ||
            item.dataset.outfitId ||
            item.dataset.id ||
            item.getAttribute("data-outfit") ||
            null
        );
    }


    function getOutfitSource(item) {

        if (!item) return null;


        const image =
            item.querySelector("img");


        if (image) {

            return (
                item.dataset.src ||
                image.dataset.src ||
                image.getAttribute("src")
            );
        }


        return item.dataset.src || null;
    }


    function applyOutfit(
        outfitId,
        source
    ) {

        state.outfit = {

            id: outfitId,

            src: source
        };


        saveState();


        updateUI();
    }


    outfitItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const outfitId =
                        getOutfitId(item);


                    const source =
                        getOutfitSource(item);


                    const price =
                        getOutfitPrice(item);


                    /*
                     * Nếu outfit này đã mua
                     */
                    const owned =
                        item.classList.contains(
                            "owned"
                        );


                    if (owned) {

                        applyOutfit(
                            outfitId,
                            source
                        );

                        return;
                    }


                    /*
                     * Không đủ tim
                     */
                    if (
                        state.hearts <
                        price
                    ) {

                        alert(
                            "Chưa đủ tim đâu nè 💗\n" +
                            "Bé cần " +
                            price +
                            " ❤️ để mua món này."
                        );

                        return;
                    }


                    /*
                     * Trừ tim
                     */
                    state.hearts -= price;


                    /*
                     * Đánh dấu đã mua
                     */
                    item.classList.add(
                        "owned"
                    );


                    /*
                     * Áp dụng outfit
                     */
                    applyOutfit(
                        outfitId,
                        source
                    );


                    /*
                     * Lưu danh sách outfit đã mua
                     */
                    saveOwnedOutfit(
                        outfitId
                    );


                    updateUI();
                }
            );
        }
    );


    /* =====================================================
       OWNED OUTFITS
    ===================================================== */

    function getOwnedOutfits() {

        try {

            const saved =
                localStorage.getItem(
                    "littleCatHouseOutfits"
                );


            if (!saved) {
                return [];
            }


            return JSON.parse(saved);

        } catch {

            return [];
        }
    }


    function saveOwnedOutfit(
        outfitId
    ) {

        if (!outfitId) return;


        const owned =
            getOwnedOutfits();


        if (
            !owned.includes(outfitId)
        ) {

            owned.push(outfitId);
        }


        localStorage.setItem(
            "littleCatHouseOutfits",
            JSON.stringify(owned)
        );
    }


    function restoreOwnedOutfits() {

        const owned =
            getOwnedOutfits();


        outfitItems.forEach(
            function (item) {

                const id =
                    getOutfitId(item);


                if (
                    id &&
                    owned.includes(id)
                ) {

                    item.classList.add(
                        "owned"
                    );
                }
            }
        );
    }


    /* =====================================================
       APPLY SAVED CAT
    ===================================================== */

    function updateCatImage() {

        if (!catImage) return;


        if (
            state.outfit &&
            state.outfit.src
        ) {

            catImage.src =
                state.outfit.src;

            return;
        }


        if (
            state.cat &&
            state.cat.src
        ) {

            catImage.src =
                state.cat.src;
        }
    }


    /* =====================================================
       UPDATE UI
    ===================================================== */

    function updateUI() {

        /*
         * Tên
         */
        setText(
            "#cat-name",
            state.name
        );

        setText(
            ".cat-name",
            state.name
        );


        /*
         * Tim
         */
        setText(
            "#heart-count",
            state.hearts
        );

        setText(
            ".heart-count",
            state.hearts
        );


        /*
         * Stats
         */
        setText(
            "#happiness",
            state.happiness
        );

        setText(
            ".happiness",
            state.happiness
        );


        setText(
            "#hunger",
            state.hunger
        );

        setText(
            ".hunger",
            state.hunger
        );


        setText(
            "#cleanliness",
            state.cleanliness
        );

        setText(
            ".cleanliness",
            state.cleanliness
        );


        /*
         * Input tên
         */
        if (
            nameInput &&
            state.name !== "My little baby"
        ) {

            nameInput.value =
                state.name;
        }


        /*
         * Ảnh mèo
         */
        updateCatImage();


        /*
         * Mèo đã chọn
         */
        if (state.cat) {

            catOptions.forEach(
                function (option) {

                    const id =
                        getCatId(option);


                    if (
                        id ===
                        state.cat.id
                    ) {

                        option.classList.add(
                            "selected"
                        );

                    } else {

                        option.classList.remove(
                            "selected"
                        );
                    }
                }
            );
        }
    }


    /* =====================================================
       RESET PET
    ===================================================== */

    const resetButton =
        $("#reset-pet") ||
        $(".reset-pet");


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Bạn có chắc muốn reset bé mèo không? 🐱"
                    );


                if (!confirmed) return;


                localStorage.removeItem(
                    STORAGE_KEY
                );

                localStorage.removeItem(
                    "littleCatHouseOutfits"
                );


                state = {
                    ...defaultState
                };


                selectedCat = null;


                catOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );
                    }
                );


                outfitItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "owned"
                        );
                    }
                );


                updateUI();


                showScreen(
                    adoptScreen
                );
            }
        );
    }


    /* =====================================================
       PET STATUS — TỰ GIẢM NHẸ THEO THỜI GIAN
    ===================================================== */

    let lastUpdate =
        Number(
            localStorage.getItem(
                "littleCatHouseLastUpdate"
            )
        );


    if (
        !Number.isFinite(lastUpdate) ||
        lastUpdate <= 0
    ) {

        lastUpdate =
            Date.now();
    }


    function updatePetOverTime() {

        const now =
            Date.now();


        const elapsed =
            now - lastUpdate;


        /*
         * Mỗi 5 phút giảm nhẹ một chút.
         */
        const fiveMinutes =
            5 * 60 * 1000;


        if (
            elapsed >=
            fiveMinutes
        ) {

            const steps =
                Math.floor(
                    elapsed /
                    fiveMinutes
                );


            state.hunger =
                Math.max(
                    0,
                    state.hunger -
                    steps * 2
                );


            state.cleanliness =
                Math.max(
                    0,
                    state.cleanliness -
                    steps * 1
                );


            state.happiness =
                Math.max(
                    0,
                    state.happiness -
                    steps * 1
                );


            lastUpdate =
                now;


            localStorage.setItem(
                "littleCatHouseLastUpdate",
                String(now)
            );


            saveState();


            updateUI();
        }
    }


    setInterval(
        updatePetOverTime,
        30000
    );


    /* =====================================================
       RESTORE SCREEN
    ===================================================== */

    restoreOwnedOutfits();


    if (state.adopted) {

        /*
         * Đã nuôi mèo rồi
         * → mở thẳng Home
         */
        showScreen(homeScreen);

    } else {

        /*
         * Chưa nuôi
         * → mở màn Adopt
         */
        showScreen(adoptScreen);
    }


    updateUI();


    /* =====================================================
       DEBUG — KHÔNG BẮT BUỘC
    ===================================================== */

    window.littleCatHouse = {

        getState: function () {
            return state;
        },

        addHearts: function (amount) {
            addHearts(amount);
        },

        reset: function () {

            localStorage.removeItem(
                STORAGE_KEY
            );

            location.reload();
        }
    };

});
