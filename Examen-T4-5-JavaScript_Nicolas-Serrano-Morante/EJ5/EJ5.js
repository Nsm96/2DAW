const list = document.querySelector("#lista li");

list.addEventListener("click", (e) => {
  if (e.target.closest(".borrar")) {
    e.target.closest("li").remove();
  }
});
