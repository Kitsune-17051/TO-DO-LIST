const ul = document.querySelector("#taskList");
const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#add");
const emptymessage = document.querySelector("#emptymessage");
const logPanel = document.querySelector("#logPanel");

function log(message) {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  const time = new Date().toLocaleTimeString();
  entry.innerHTML = `<span>[${time}]</span> ${message}`;
  logPanel.prepend(entry);
}

function checkEmpty() {
  emptymessage.style.display =
    ul.querySelectorAll(".list-item").length === 0 ? "block" : "none";
}

// Add new task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (!text) {
    log(
      "<i class='fa-solid fa-triangle-exclamation warning'></i>  Cannot add empty task",
    );
    input.focus();
    return;
  }

  const li = document.createElement("li");
  li.className = "list-item";

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" class="task-check">
      <span class="task-text"></span>
    </div>
    <div class="task-right">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn"><i class="fa-solid fa-xmark icon"></i></button>
    </div>
  `;

  li.querySelector(".task-text").textContent = text;
  ul.prepend(li);

  log(
    `<i class="fa-solid fa-square-check add-icon icon"></i> Added: "${text}"`,
  );
  input.value = "";
  input.focus();
  checkEmpty();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Delete Functionality
ul.addEventListener("click", (e) => {
  const delBtn = e.target.closest(".delete-btn");
  if (!delBtn) return;

  const li = delBtn.closest(".list-item");
  const text = li.querySelector(".task-text").textContent;

  log(
    `<i class="fa-regular fa-trash-can garbage-can icon"></i> Deleted: "${text}"`,
  );
  li.remove();
  checkEmpty();
});

// Edit Task
ul.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  if (!editBtn) return;

  const li = editBtn.closest(".list-item");
  const textSpan = li.querySelector(".task-text");

  if (li.classList.contains("editing")) {
    const inputBox = li.querySelector(".edit-input");
    const newText = inputBox.value.trim();

    if (!newText) {
      log(
        "<i class='fa-solid fa-triangle-exclamation warning'></i> Task cannot be empty",
      );
      inputBox.focus();
      return;
    }

    textSpan.textContent = newText;
    inputBox.remove();
    textSpan.style.display = "";
    editBtn.textContent = "Edit";
    li.classList.remove("editing");

    log(`<i class="fa-regular fa-bookmark icon"></i> Saved: "${newText}"`);
  } else {
    const currentText = textSpan.textContent;

    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.value = currentText;
    inputBox.className = "edit-input";

    textSpan.style.display = "none";
    li.querySelector(".task-left").appendChild(inputBox);

    editBtn.textContent = "Save";
    li.classList.add("editing");

    inputBox.focus();
    inputBox.select();

    log(
      `<i class="fa-solid fa-pen-to-square icon"></i> Editing: "${currentText}"`,
    );
  }
});

// Highlighting
ul.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) return;
  if (e.target.closest(".edit-btn")) return;
  if (e.target.matches(".task-check")) return;

  const li = e.target.closest(".list-item");
  if (!li) return;

  li.classList.toggle("highlight");

  const text = li.querySelector(".task-text").textContent;
  const status = li.classList.contains("highlight")
    ? "highlighted"
    : "unhighlighted";

  log(`<i class="fa-solid fa-map-pin icon-red"></i> ${status}: "${text}"`);
});

//   Handling checkbox change ehre =========
ul.addEventListener("change", (e) => {
  if (!e.target.matches(".task-check")) return;

  const li = e.target.closest(".list-item");
  const textSpan = li.querySelector(".task-text");

  if (e.target.checked) {
    textSpan.style.textDecoration = "line-through red 2px";
    log(
      `<i class="fa-solid fa-check icon"></i> Completed: "${textSpan.textContent}"`,
    );
  } else {
    textSpan.style.textDecoration = "none";
    log(
      `<i class="fa-solid fa-arrow-rotate-left icon"></i> Unchecked: "${textSpan.textContent}"`,
    );
  }
});

checkEmpty();
