export function initTheme() {
  let btn = document.getElementById("dark-toggle");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "dark-toggle";
    btn.innerText = "🌙 Dark Mode";
    const menu = document.getElementById("menu-lateral");
    if (menu) menu.appendChild(btn);
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    btn.innerText = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.innerText = "☀️ Light Mode";
  }
}
