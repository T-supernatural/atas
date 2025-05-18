const resources = [
  {
    id: 1,
    title: "Past Questions 2023",
    description: "Complete past questions for Theatre Arts 2023.",
    fileUrl: "/downloads/past-questions-2023.pdf",
  },
  {
    id: 2,
    title: "Acting Basics PDF",
    description: "A beginner’s guide to acting techniques.",
    fileUrl: "/downloads/acting-basics.pdf",
  },
  {
    id: 3,
    title: "Lighting Setup Video",
    description: "Tutorial video on basic theatre lighting.",
    fileUrl: "/downloads/lighting-setup.mp4",
  },
];

const resourcesList = document.getElementById("resources-list");
const searchInput = document.getElementById("resource-search");

function renderResources(list) {
  resourcesList.innerHTML = "";
  if (list.length === 0) {
    resourcesList.innerHTML = `<p class="text-gray-500 col-span-full text-center">No resources found.</p>`;
    return;
  }
  list.forEach((res) => {
    const resourceCard = document.createElement("div");
    resourceCard.className =
      "border rounded-lg p-4 shadow hover:shadow-lg transition";

    resourceCard.innerHTML = `
        <h3 class="font-semibold text-lg mb-2 text-black">${res.title}</h3>
        <p class="text-gray-600 mb-4">${res.description}</p>
        <a
          href="${res.fileUrl}"
          download
          class="inline-block bg-black hover:bg-amber-600 text-white px-4 py-2 rounded transition"
        >
          Download
        </a>
      `;

    resourcesList.appendChild(resourceCard);
  });
}

// Initial render
renderResources(resources);

// Filter logic
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query)
  );
  renderResources(filtered);
});
