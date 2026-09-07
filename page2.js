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
