window.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatHeader = document.getElementById("chat-header");
  const typingIndicator = document.getElementById("typing-indicator");

  const userName = localStorage.getItem("atasMemberName") || "Guest";
  chatHeader.textContent = `Welcome, ${userName}`;

  let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  // Utility: generate a color from a username (hash-based)
  function getUserColor(name) {
    if (!name) name = "Unknown"; // fallback for undefined/null/empty
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  }
  

  function renderMessages() {
    chatBox.innerHTML = "";
    messages.forEach(displayMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function displayMessage(msg) {
    const isMine = msg.name === userName;
    const wrapper = document.createElement("div");
    wrapper.className = `flex ${isMine ? "justify-end" : "justify-start"} mb-3`;

    const bubble = document.createElement("div");
    bubble.className = `max-w-[70%] p-3 rounded-lg text-sm shadow ${
      isMine ? "bg-blue-100 text-right" : ""
    }`;
    bubble.style.backgroundColor = isMine ? "#dbeafe" : getUserColor(msg.name);

    bubble.innerHTML = `
        <div class="font-semibold text-gray-800 text-left">${
          !isMine ? msg.name : ""
        }</div>
        <div class="text-gray-700 mt-1">${msg.text}</div>
        <div class="text-xs text-gray-500 mt-1 flex justify-between items-center">
          <span>${msg.time}</span>
          ${
            isMine
              ? `<button data-id="${msg.id}" class="ml-4 text-red-500 text-xs delete-btn">🗑</button>`
              : ""
          }
        </div>
      `;

    wrapper.appendChild(bubble);
    chatBox.appendChild(wrapper);
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit event fired"); // <-- DEBUG LINE
    const text = chatInput.value.trim();
    if (!text) {
      console.log("Empty message, ignoring");
      return;
    }  

    const msg = {
      id: Date.now(),
      name: userName,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    messages.push(msg);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    chatInput.value = "";
    renderMessages();
    botReply(text);
  });

  // Delete handler
  chatBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const msgId = parseInt(e.target.dataset.id);
      messages = messages.filter((msg) => msg.id !== msgId);
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      renderMessages();
    }
  });

  // Typing animation
  chatInput.addEventListener("input", () => {
    typingIndicator.classList.remove("hidden");
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      typingIndicator.classList.add("hidden");
    }, 1000);
  });

  // ATAS Bot auto-response
  function botReply(userMessage) {
    setTimeout(() => {
      typingIndicator.classList.add("hidden");

      let response = "🎭 ATAS Bot: Got your message!";
      if (/event|meeting|rehearsal/i.test(userMessage)) {
        response =
          "🎭 ATAS Bot: The next rehearsal is tomorrow at 4PM. Don’t forget your costume!";
      } else if (/hello|hi|hey/i.test(userMessage)) {
        response = `🎭 ATAS Bot: Hey there, ${userName}! Welcome to the chat!`;
      }

      const msg = {
        id: Date.now() + 1,
        name: "🎭 ATAS Bot",
        text: response,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      messages.push(msg);
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      renderMessages();
    }, 1500);
  }

  // Initial render
  renderMessages();
});
// Check login on page load
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      alert("You must login first!");
      window.location.href = "membership.html";
    }
  });
  
  // Logout button handler
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("atasMemberName");
    window.location.href = "membership.html";
  });
  