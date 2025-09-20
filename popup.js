document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, "STOP_CLICKING", (response) => {
            console.log(response?.status || "No response");
        });
    });
});
