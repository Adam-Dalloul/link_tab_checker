document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  let extensionStatus = true; // Track the current extension status

  // Request the current extension status from the background script
  chrome.runtime.sendMessage({ action: "getExtensionStatus" }, (response) => {
    extensionStatus = response.enabled;
    toggleButton.classList.toggle("off", !extensionStatus);
  });

  // Toggle the extension status when the button is clicked
  toggleButton.addEventListener("click", () => {
    // Check if the extension is already in the process of enabling or disabling
    if (toggleButton.classList.contains("disabled")) {
      return; // Exit early if already disabled
    }

    toggleButton.classList.add("disabled"); // Disable the button temporarily

    // Send a message to the background script to update the extension status
    chrome.runtime.sendMessage(
      { action: "toggleExtension", enabled: !extensionStatus },
      (response) => {
        extensionStatus = response.enabled;
        toggleButton.classList.toggle("off", !extensionStatus);
        toggleButton.classList.remove("disabled"); // Re-enable the button
      }
    );
  });
});
