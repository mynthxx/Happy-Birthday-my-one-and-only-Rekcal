/* =========================
   HIỂN THỊ NGÀY + GIỜ VIỆT NAM
========================= */

function updateDateTime() {

    const now = new Date();

    const date = new Intl.DateTimeFormat(
        "vi-VN",
        {
            timeZone: "Asia/Ho_Chi_Minh",
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    ).format(now);

    const time = new Intl.DateTimeFormat(
        "vi-VN",
        {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    ).format(now);

    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;
}


/* Chạy ngay */

updateDateTime();


/* Cập nhật mỗi giây */

setInterval(updateDateTime, 1000);


/* =========================
   PASSWORD
========================= */

const correctPassword = "061095";

const passwordInput =
    document.getElementById("password");

const loginButton =
    document.getElementById("login-button");

const message =
    document.getElementById("message");


function checkPassword() {

    const password = passwordInput.value.trim();


    /* =========================
       PASSWORD ĐÚNG
    ========================== */

    if (password === correctPassword) {

        message.textContent =
            "♡ Loading... ♡";

        message.style.color = "white";

        passwordInput.style.borderColor =
            "rgba(255,255,255,0.9)";

        loginButton.style.transform =
            "scale(1.08)";


        /* Chờ 0,8 giây rồi sang Trang 2 */

        setTimeout(function() {

            window.location.href = "page2.html";

        }, 800);

    }


    /* =========================
       PASSWORD SAI
    ========================== */

    else {

        message.textContent =
            "Sai password rồi ăm chã húi 🥺";

        passwordInput.value = "";

        passwordInput.focus();
    }
}


/* =========================
   BẤM NÚT
========================= */

loginButton.addEventListener(
    "click",
    checkPassword
);


/* =========================
   NHẤN ENTER
========================= */

passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            checkPassword();
        }

    }
);
