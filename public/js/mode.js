//MODE
const mode = document.getElementById("mode");
const main = document.getElementById("divmain");
const idbody = document.getElementById("idbody");
const theme = localStorage.getItem("theme");

if (theme == "1") {
  document.body.classList.toggle("light");
  main.className = "main light";
} else {
  main.className = "main";
}

mode.addEventListener("change", () => {
  document.body.classList.toggle("light");
  if (idbody.className == "light") {
    main.className = "main light";
    localStorage.setItem("theme", 1);
  } else {
    main.className = "main";
    localStorage.setItem("theme", 0);
  }
});
