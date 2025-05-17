document
  .getElementById("membership-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Store name in localStorage
    localStorage.setItem("atasMemberName", name);

    // Redirect to chat page
    window.location.href = "chat.html";
  });
