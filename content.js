const BUTTON_ID = "karan";
const MAX_CLICKS = 95;
let clickCount = 0;
let isRunning = true;
let timerId = null;

function getRandomDelay() {
    return Math.floor(Math.random() * (18000 - 12000 + 1)) + 12000;
}

function autoClick() {
    if (!isRunning || clickCount >= MAX_CLICKS) {
        console.log("⏹️ Auto Clicker stopped.");
        return;
    }

    const button = document.getElementById(BUTTON_ID);

    if (!button) {
        console.error(`❌ Button with ID "${BUTTON_ID}" not found.`);
        return;
    }

    console.log(`🔁 Clicking [${clickCount + 1}/${MAX_CLICKS}]`);
    button.click();
    clickCount++;

    timerId = setTimeout(autoClick, getRandomDelay());
}

function stopClicking() {
    isRunning = false;
    clearTimeout(timerId);
    console.log("🛑 Clicking manually stopped via popup.");
}

// Start automatically
window.addEventListener('load', () => {
    console.log("🚀 Auto Clicker Starting...");
    setTimeout(autoClick, 2000);
});

// Listen for stop signal from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "STOP_CLICKING") {
        stopClicking();
        sendResponse({ status: "stopped" });
    }
});
