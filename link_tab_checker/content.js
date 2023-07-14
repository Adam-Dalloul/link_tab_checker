function handleMouseEnter(event) {
  const target = event.target;
  if (target.tagName === "A") {
    const newTab = target.target === "_blank";
    const hoverInfo = document.createElement("div");
    hoverInfo.classList.add("hover-info");
    hoverInfo.textContent = newTab ? "Opens in new tab" : "Does not open in new tab";
    target.appendChild(hoverInfo);
  }
}

function handleMouseLeave(event) {
  const target = event.target;
  if (target.tagName === "A") {
    const hoverInfo = target.querySelector(".hover-info");
    if (hoverInfo) {
      hoverInfo.remove();
    }
  }
}

// Check if the extension is enabled before adding event listeners
chrome.runtime.sendMessage({ action: "getExtensionStatus" }, (response) => {
  const extensionEnabled = response.enabled;
  if (extensionEnabled) {
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
  }
});
