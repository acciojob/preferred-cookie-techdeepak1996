document.addEventListener("DOMContentLoaded", function() {
  // Function to set cookies
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // Function to get cookies
  function getCookie(name) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim().split("="));
    const cookie = cookies.find(c => c[0] === name);
    return cookie ? cookie[1] : null;
  }

  // Function to apply user preferences
  function applyPreferences() {
    const fontSizeInput = document.getElementById("fontsize");
    const fontColorInput = document.getElementById("fontcolor");

    const fontSize = getCookie("fontsize") || "16px"; // Default font size if not set
    const fontColor = getCookie("fontcolor") || "#000000"; // Default font color if not set

    // Update CSS variables
    document.documentElement.style.setProperty('--fontsize', fontSize);
    document.documentElement.style.setProperty('--fontcolor', fontColor);

    fontSizeInput.value = parseInt(fontSize); // Set input value
    fontColorInput.value = fontColor; // Set input value
  }

  // Event listener for form submission
  document.getElementById("preferences-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const fontSize = document.getElementById("fontsize").value + 'px'; // Add 'px' to match CSS
    const fontColor = document.getElementById("fontcolor").value;

    // Set cookies with user preferences
    setCookie("fontsize", fontSize, 30); // Cookie expires in 30 days
    setCookie("fontcolor", fontColor, 30); // Cookie expires in 30 days

    // Apply user preferences immediately
    applyPreferences();
  });

  // Apply user preferences on page load
  applyPreferences();
});
