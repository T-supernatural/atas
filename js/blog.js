const isAdmin = true; // Change this to false to hide the admin panel

const blogData = [
  {
    title: "The Rise of Experimental Theatre",
    image: "../IMG/pic-one.jpg",
    date: "May 10, 2025",
    desc: "How boundary-pushing performances are reshaping Nigerian theatre.",
  },
  {
    title: "Spotlight on ATAS LASU Talents",
    image: "../IMG/pic-two.jpg",
    date: "April 28, 2025",
    desc: "An in-depth look into our most outstanding performers.",
  },
];

const eventData = [
  {
    title: "Stage Play: Echoes of the Motherland",
    image: "../IMG/pic-three.jpg",
    date: "June 1, 2025",
    desc: "A powerful exploration of tradition and modernity through live drama.",
  },
  {
    title: "Drama Night 2025",
    image: "../IMG/pic-one.jpg",
    date: "June 15, 2025",
    desc: "An electrifying night of monologues, music, and movement.",
  },
];

const tags = [
  "#Drama",
  "#TheatreArts",
  "#ATASLASU",
  "#Creativity",
  "#Culture",
  "#StagePlay",
];

const instaImages = [
  "../IMG/pic-one.jpeg",
  "../IMG/pic-one.jpeg",
  "../IMG/pic-one.jpeg",
  "../IMG/pic-one.jpeg",
  "../IMG/pic-one.jpeg",
  "../IMG/pic-one.jpeg",
];

const contentContainer = document.getElementById("contentContainer");
const blogTab = document.getElementById("blogTab");
const eventTab = document.getElementById("eventTab");

function renderCards(data) {
  contentContainer.innerHTML = data
    .map(
      (post) => `
    <div class="bg-gray-50 rounded-xl shadow-md overflow-hidden">
      <img src="${post.image}" alt="${post.title}" class="w-full h-60 object-cover">
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-amber-600 mb-2">${post.title}</h3>
        <p class="text-sm text-gray-500 mb-2">${post.date}</p>
        <p class="text-gray-600">${post.desc}</p>
      </div>
    </div>
  `
    )
    .join("");
}

function renderSidebar() {
  document.getElementById("recentPosts").innerHTML = blogData
    .map((post) => `<li>${post.title}</li>`)
    .join("");
  document.getElementById("tags").innerHTML = tags
    .map(
      (tag) =>
        `<span class='bg-blue-100 text-amber-600 text-xs px-3 py-1 rounded-full'>${tag}</span>`
    )
    .join("");
  document.getElementById("instaFeed").innerHTML = instaImages
    .map(
      (img) => `<img src="${img}" class="rounded-lg h-20 w-full object-cover">`
    )
    .join("");
}

blogTab.addEventListener("click", () => {
  blogTab.classList.add(
    "active-tab",
    "text-amber-600",
    "border-b-2",
    "border-amber-600"
  );
  eventTab.classList.remove(
    "active-tab",
    "text-amber-600",
    "border-b-2",
    "border-amber-600"
  );
  renderCards(blogData);
});

eventTab.addEventListener("click", () => {
  eventTab.classList.add(
    "active-tab",
    "text-amber-600",
    "border-b-2",
    "border-amber-600"
  );
  blogTab.classList.remove(
    "active-tab",
    "text-amber-600",
    "border-b-2",
    "border-amber-600"
  );
  renderCards(eventData);
});

// Initial render
renderCards(blogData);
renderSidebar();
