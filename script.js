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

    const password = passwordInput.value;

    if (password === correctPassword) {

        message.textContent = "♡ Đúng rồi đó ăaaa ♡";

        message.style.color = "white";

        passwordInput.style.borderColor =
            "rgba(255,255,255,0.9)";

        /*
        Khi Trang 2 được tạo,
        chúng ta sẽ thay đoạn này bằng:

        window.location.href = "page2.html";
        */

    } else {

        message.textContent =
            "Hmmm... sai rồi ăm chã húi 🥺";

        passwordInput.value = "";

        passwordInput.focus();
    }
}


/* Bấm nút */

loginButton.addEventListener(
    "click",
    checkPassword
);


/* Bấm Enter */

passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            checkPassword();
        }

    }
);
