module.exports = {
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  // tailwind.config.js
  plugins: [require("tailwind-scrollbar-hide")],
};
