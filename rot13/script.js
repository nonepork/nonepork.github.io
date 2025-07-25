document.addEventListener("DOMContentLoaded", () => {
  let operationCount = 0;

  // Matrix rain effect - Fixed version
  function initMatrix() {
    const canvas = document.getElementById("matrix");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()){/*-+";
    const drops = [];
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor((Math.random() * canvas.height) / fontSize);
    }

    function drawMatrix() {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    // Start the animation
    const matrixInterval = setInterval(drawMatrix, 35);

    // Handle window resize
    window.addEventListener("resize", () => {
      resizeCanvas();
      // Reinitialize drops for new canvas size
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      for (let x = 0; x < newColumns; x++) {
        if (drops[x] === undefined) {
          drops[x] = Math.floor((Math.random() * canvas.height) / fontSize);
        }
      }
    });

    return matrixInterval;
  }

  // Initialize matrix when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMatrix);
  } else {
    initMatrix();
  }

  // Update uptime
  let startTime = Date.now();
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    document.getElementById("uptime").textContent =
      `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);

  function rotN(str, n) {
    return str.replace(/[A-Za-z]/g, function (char) {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + n) % 26) + start,
      );
    });
  }

  // Update stats
  function updateStats() {
    const input = document.getElementById("inputText").value;
    document.getElementById("charCount").textContent = input.length;
    document.getElementById("wordCount").textContent = input.trim()
      ? input.trim().split(/\s+/).length
      : 0;
    document.getElementById("operations").textContent = operationCount;
  }

  // Encode text
  function encodeText() {
    const input = document.getElementById("inputText").value;
    const rotValue = parseInt(document.getElementById("rotValue").value);
    const output = rotN(input, rotValue);
    document.getElementById("outputText").value = output;
    operationCount++;
    updateStats();

    // Add typing effect
    typeWriter(document.getElementById("outputText"), output);
  }

  // Decode text
  function decodeText() {
    const input = document.getElementById("inputText").value;
    const rotValue = parseInt(document.getElementById("rotValue").value);
    // To decode, we rotate in the opposite direction
    const output = rotN(input, 26 - rotValue);
    document.getElementById("outputText").value = output;
    operationCount++;
    updateStats();

    // Add typing effect
    typeWriter(document.getElementById("outputText"), output);
  }

  // Clear all
  function clearAll() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
    updateStats();
  }

  // Typing effect
  function typeWriter(element, text) {
    element.value = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.value += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 10);
  }

  // Update stats on input
  document.getElementById("inputText").addEventListener("input", updateStats);

  // Initialize stats
  updateStats();

  // Konami Code - Fixed version
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  function handleKonamiCode(e) {
    konamiCode.push(e.code);

    // Keep only the last 10 keys
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    // Check if sequence matches
    if (konamiCode.length === konamiSequence.length) {
      let matches = true;
      for (let i = 0; i < konamiSequence.length; i++) {
        if (konamiCode[i] !== konamiSequence[i]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        console.log("KONAMI CODE ACTIVATED!"); // Debug log
        const titleElement = document.querySelector(".title");
        if (titleElement) {
          titleElement.textContent = "KONAMI CODE ACTIVATED!";
          titleElement.style.color = "#ff00ff";
          titleElement.style.textShadow = "0 0 20px #ff00ff";
        }

        document.body.style.filter = "hue-rotate(180deg) saturate(1.5)";
        document.body.style.animation = "pulse 0.5s infinite alternate";
      }
    }
  }

  // Add Konami code listener
  document.addEventListener("keydown", handleKonamiCode);
});
