const isAdmin = true; // ← Toggle to false for user-only view
const blogForm = document.getElementById("blog-form");
const eventForm = document.getElementById("event-form");
const contentArea = document.getElementById("content-area");
const recentPosts = document.getElementById("recent-posts");
const searchInput = document.getElementById("search-input");

const blogs = [];
const events = [];

let currentTab = "blogs";

function renderUserContent() {
  const list = currentTab === "blogs" ? blogs : events;
  const keyword = searchInput.value.toLowerCase();

  contentArea.innerHTML = "";

  const filtered = list.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) ||
      (item.content || item.description).toLowerCase().includes(keyword)
  );

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.className = "mb-8 bg-white p-6 rounded shadow";

    div.innerHTML = `
                ${
                  item.image
                    ? `<img src="${item.image}" class="w-full h-48 object-cover rounded mb-4" />`
                    : ""
                }
                <h3 class="text-2xl font-bold text-blue-700">${item.title}</h3>
                <p class="mt-2 text-gray-700">${
                  item.content || item.description
                }</p>
                ${
                  item.date
                    ? `<p class="mt-1 text-sm text-gray-500"><strong>Date:</strong> ${item.date}</p>`
                    : ""
                }
                ${
                  item.location
                    ? `<p class="text-sm text-gray-500"><strong>Location:</strong> ${item.location}</p>`
                    : ""
                }
                ${
                  item.tags
                    ? `<p class="mt-1 text-sm text-blue-500"><strong>Tags:</strong> ${item.tags}</p>`
                    : ""
                }
                ${
                  isAdmin
                    ? `<button class="text-red-600 mt-3" onclick="deleteItem('${currentTab}', ${item.id})">Delete</button>`
                    : ""
                }
            `;
    contentArea.appendChild(div);
  });

  renderSidebar(filtered);
}

function renderSidebar(items) {
  if (!recentPosts) return;
  recentPosts.innerHTML = "";
  items
    .slice(-5)
    .reverse()
    .forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <div>
                    <h4 class="font-semibold text-blue-800">${post.title}</h4>
                    ${
                      post.image
                        ? `<img src="${post.image}" class="w-full h-20 object-cover rounded mt-2" />`
                        : ""
                    }
                </div>
            `;
      recentPosts.appendChild(li);
    });
}

function deleteItem(type, id) {
  if (type === "blogs") {
    const index = blogs.findIndex((b) => b.id === id);
    if (index !== -1) blogs.splice(index, 1);
  } else {
    const index = events.findIndex((e) => e.id === id);
    if (index !== -1) events.splice(index, 1);
  }
  renderUserContent();
}

// EVENT FORM SUBMIT
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("event-title").value;
  const description = document.getElementById("event-description").value;
  const date = document.getElementById("event-date").value;
  const location = document.getElementById("event-location").value;
  const image = document.getElementById("event-image").value;

  const id = Date.now();
  events.push({ id, title, description, date, location, image });
  eventForm.reset();
  if (currentTab === "events") renderUserContent();
});

// TAB TOGGLE
document.getElementById("tab-blogs").addEventListener("click", () => {
  currentTab = "blogs";
  toggleUserTabs();
  renderUserContent();
});
document.getElementById("tab-events").addEventListener("click", () => {
  currentTab = "events";
  toggleUserTabs();
  renderUserContent();
});

function toggleUserTabs() {
  document
    .querySelectorAll(".tab")
    .forEach((tab) =>
      tab.classList.remove("active", "border-b-4", "text-blue-700")
    );
  const activeBtn = currentTab === "blogs" ? "tab-blogs" : "tab-events";
  document
    .getElementById(activeBtn)
    .classList.add("active", "border-b-4", "text-blue-700");
}

// ADMIN TABS
document.getElementById("admin-tab-blog").addEventListener("click", () => {
  blogForm.classList.remove("hidden");
  eventForm.classList.add("hidden");
});

document.getElementById("admin-tab-event").addEventListener("click", () => {
  eventForm.classList.remove("hidden");
  blogForm.classList.add("hidden");
});

// SEARCH LISTENER
searchInput.addEventListener("input", () => renderUserContent());

// INIT
if (!isAdmin) {
  document.getElementById("admin-panel").classList.add("hidden");
} else {
  document.getElementById("admin-panel").classList.remove("hidden");
}
renderUserContent();
// Utility to read file
function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// BLOG SUBMIT
blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("blog-title").value;
  const content = document.getElementById("blog-content").value;
  const tags = document.getElementById("blog-tags").value;
  const file = document.getElementById("blog-image").files[0];

  if (file) {
    readImage(file, (base64) => {
      blogs.push({ id: Date.now(), title, content, tags, image: base64 });
      blogForm.reset();
      if (currentTab === "blogs") renderUserContent();
    });
  } else {
    blogs.push({ id: Date.now(), title, content, tags, image: null });
    blogForm.reset();
    if (currentTab === "blogs") renderUserContent();
  }
});

// EVENT SUBMIT
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("event-title").value;
  const description = document.getElementById("event-description").value;
  const date = document.getElementById("event-date").value;
  const location = document.getElementById("event-location").value;
  const file = document.getElementById("event-image").files[0];

  if (file) {
    readImage(file, (base64) => {
      events.push({
        id: Date.now(),
        title,
        description,
        date,
        location,
        image: base64,
      });
      eventForm.reset();
      if (currentTab === "events") renderUserContent();
    });
  } else {
    events.push({
      id: Date.now(),
      title,
      description,
      date,
      location,
      image: null,
    });
    eventForm.reset();
    if (currentTab === "events") renderUserContent();
  }
});
