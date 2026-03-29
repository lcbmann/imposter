const categorySelect = document.getElementById("categorySelect");
const playerCountInput = document.getElementById("playerCount");
const categoryToggle = document.getElementById("categoryToggle");
const hintToggle = document.getElementById("hintToggle");
const startRoundButton = document.getElementById("startRound");
const revealButton = document.getElementById("revealButton");
const hideButton = document.getElementById("hideButton");
const restartRoundButton = document.getElementById("restartRound");
const reshuffleRolesButton = document.getElementById("reshuffleRoles");
const hiddenView = document.getElementById("hiddenView");
const revealView = document.getElementById("revealView");
const completeView = document.getElementById("completeView");
const playerPrompt = document.getElementById("playerPrompt");
const roleHeadline = document.getElementById("roleHeadline");
const roleDetails = document.getElementById("roleDetails");
const roleTag = document.getElementById("roleTag");
const roundStatus = document.getElementById("roundStatus");
const setupMessage = document.getElementById("setupMessage");
const customCategoryNameInput = document.getElementById("customCategoryName");
const customCategoryWordsInput = document.getElementById("customCategoryWords");
const saveCategoryButton = document.getElementById("saveCategory");
const clearCategoryButton = document.getElementById("clearCategory");
const customCategoryList = document.getElementById("customCategoryList");

const STORAGE_KEY = "imposter.customCategories.v1";
const SAME_PLAYER_WEIGHT = 0.5;

const BUILT_IN_CATEGORIES = {
  Food: [
    { word: "Pizza", hint: "Cheesy, triangular slices" },
    { word: "Sushi", hint: "Rice rolled with seaweed" },
    { word: "Taco", hint: "Folded and filled tortilla" },
    { word: "Pancakes", hint: "Breakfast stack with syrup" },
    { word: "Guacamole", hint: "Creamy avocado dip" },
  ],
  Animals: [
    { word: "Elephant", hint: "Massive, with a trunk" },
    { word: "Penguin", hint: "Flightless bird in tuxedo" },
    { word: "Kangaroo", hint: "Jumps with a pouch" },
    { word: "Giraffe", hint: "Very long neck" },
    { word: "Dolphin", hint: "Smart ocean acrobat" },
  ],
  Travel: [
    { word: "Passport", hint: "Tiny booklet for borders" },
    { word: "Suitcase", hint: "Rolling travel companion" },
    { word: "Compass", hint: "Points you north" },
    { word: "Hostel", hint: "Budget traveler bed" },
    { word: "Ticket", hint: "Admits you aboard" },
  ],
  Sports: [
    { word: "Basketball", hint: "Orange ball, tall hoop" },
    { word: "Tennis", hint: "Rackets and a net" },
    { word: "Soccer", hint: "World's most popular game" },
    { word: "Hockey", hint: "Ice, sticks, and puck" },
    { word: "Volleyball", hint: "Bump, set, spike" },
  ],
  Movies: [
    { word: "Director", hint: "Calls 'Action!'" },
    { word: "Popcorn", hint: "Buttery theater snack" },
    { word: "Trailer", hint: "Preview before the film" },
    { word: "Credits", hint: "Roll at the end" },
    { word: "Sequel", hint: "Next installment" },
  ],
};

const state = {
  playerCount: 6,
  currentPlayer: 1,
  imposterIndex: 1,
  category: "",
  word: "",
  hint: "",
  showCategoryToImposter: true,
  showHintToImposter: false,
  roundReady: false,
  customCategories: loadCustomCategories(),
};

function loadCustomCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const categories = {};
    Object.entries(parsed).forEach(([name, value]) => {
      const categoryName = normalizeText(name);
      if (!categoryName || !Array.isArray(value) || isBuiltInCategory(categoryName)) {
        return;
      }

      const entries = normalizeEntries(value);
      if (entries.length > 0) {
        categories[categoryName] = entries;
      }
    });

    return categories;
  } catch (error) {
    console.warn("[Debug] Failed to load custom categories:", error);
    return {};
  }
}

function saveCustomCategories() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.customCategories));
    return true;
  } catch (error) {
    console.warn("[Debug] Failed to save custom categories:", error);
    setMessage("Your browser blocked saving custom categories.", true);
    return false;
  }
}

function normalizeText(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return normalizeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeEntries(entries) {
  const seen = new Set();
  const normalized = [];

  entries.forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }

    const word = normalizeText(entry.word);
    const hint = normalizeText(entry.hint);
    if (!word) {
      return;
    }

    const dedupeKey = word.toLowerCase();
    if (seen.has(dedupeKey)) {
      return;
    }

    seen.add(dedupeKey);
    normalized.push({
      word,
      hint,
    });
  });

  return normalized;
}

function parseWordList(rawText) {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const entries = lines.map((line) => {
    const separators = ["|", "=>", " - ", ":"];
    for (const separator of separators) {
      const index = line.indexOf(separator);
      if (index > 0) {
        return {
          word: line.slice(0, index),
          hint: line.slice(index + separator.length),
        };
      }
    }

    return { word: line, hint: "" };
  });

  return normalizeEntries(entries);
}

function getAllCategories() {
  return {
    ...BUILT_IN_CATEGORIES,
    ...state.customCategories,
  };
}

function getCategoryNames() {
  return Object.keys(getAllCategories());
}

function categoryExists(name) {
  const target = normalizeText(name).toLowerCase();
  return getCategoryNames().some((categoryName) => categoryName.toLowerCase() === target);
}

function findCustomCategoryKey(name) {
  const target = normalizeText(name).toLowerCase();
  return Object.keys(state.customCategories).find(
    (categoryName) => categoryName.toLowerCase() === target
  );
}

function isBuiltInCategory(name) {
  const target = normalizeText(name).toLowerCase();
  return Object.keys(BUILT_IN_CATEGORIES).some(
    (categoryName) => categoryName.toLowerCase() === target
  );
}

function refreshCategoryOptions(selectedCategory = categorySelect.value) {
  categorySelect.innerHTML = "";

  const randomOption = document.createElement("option");
  randomOption.value = "random";
  randomOption.textContent = "Random category";
  categorySelect.appendChild(randomOption);

  const builtInNames = Object.keys(BUILT_IN_CATEGORIES);
  if (builtInNames.length > 0) {
    const builtInGroup = document.createElement("optgroup");
    builtInGroup.label = "Built-in categories";
    builtInNames.forEach((categoryName) => {
      const option = document.createElement("option");
      option.value = categoryName;
      option.textContent = categoryName;
      builtInGroup.appendChild(option);
    });
    categorySelect.appendChild(builtInGroup);
  }

  const customNames = Object.keys(state.customCategories);
  if (customNames.length > 0) {
    const customGroup = document.createElement("optgroup");
    customGroup.label = "Saved categories";
    customNames.forEach((categoryName) => {
      const option = document.createElement("option");
      option.value = categoryName;
      option.textContent = categoryName;
      customGroup.appendChild(option);
    });
    categorySelect.appendChild(customGroup);
  } else {
    const emptyOption = document.createElement("option");
    emptyOption.value = "__no_custom_categories__";
    emptyOption.disabled = true;
    emptyOption.textContent = "No saved categories yet";
    categorySelect.appendChild(emptyOption);
  }

  if (selectedCategory && selectedCategory !== "__no_custom_categories__" && categoryExists(selectedCategory)) {
    categorySelect.value = selectedCategory;
  } else {
    categorySelect.value = "random";
  }
}

function renderCustomCategoryList() {
  const names = Object.keys(state.customCategories);
  customCategoryList.innerHTML = "";

  if (names.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "muted small saved-empty";
    emptyState.textContent = "No custom categories saved yet.";
    customCategoryList.appendChild(emptyState);
    return;
  }

  names.forEach((name) => {
    const entries = state.customCategories[name];
    const item = document.createElement("div");
    item.className = "saved-category-item";

    const info = document.createElement("div");
    info.className = "saved-category-info";

    const title = document.createElement("strong");
    title.textContent = name;
    info.appendChild(title);

    const meta = document.createElement("p");
    meta.className = "muted small";
    meta.textContent = `${entries.length} word${entries.length === 1 ? "" : "s"} saved locally`;
    info.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "saved-category-actions";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "ghost danger";
    deleteButton.dataset.deleteCategory = name;
    deleteButton.textContent = "Delete";
    actions.appendChild(deleteButton);

    item.appendChild(info);
    item.appendChild(actions);
    customCategoryList.appendChild(item);
  });
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickCategory() {
  const choice = categorySelect.value;
  if (choice === "random") {
    return randomItem(getCategoryNames());
  }

  if (categoryExists(choice)) {
    return choice;
  }

  return randomItem(Object.keys(BUILT_IN_CATEGORIES));
}

function pickWord(category) {
  const bank = getAllCategories();
  const entries = bank[category] || [];
  const entry = randomItem(entries);
  return {
    word: entry.word,
    hint: entry.hint || "No hint provided",
  };
}

function pickImposterIndex(playerCount, previousImposterIndex) {
  if (
    !Number.isInteger(previousImposterIndex) ||
    previousImposterIndex < 1 ||
    previousImposterIndex > playerCount
  ) {
    return Math.floor(Math.random() * playerCount) + 1;
  }

  const weights = Array.from({ length: playerCount }, (_, index) => {
    const playerIndex = index + 1;
    return playerIndex === previousImposterIndex ? SAME_PLAYER_WEIGHT : 1;
  });

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * totalWeight;

  for (let index = 0; index < weights.length; index += 1) {
    roll -= weights[index];
    if (roll < 0) {
      return index + 1;
    }
  }

  return playerCount;
}

function setMessage(message, isError = false) {
  if (!message) {
    setupMessage.classList.add("message-hidden");
    setupMessage.textContent = "";
    setupMessage.classList.remove("message-error");
    return;
  }

  setupMessage.textContent = message;
  setupMessage.classList.remove("message-hidden");
  setupMessage.classList.toggle("message-error", isError);
}

function updateStatus(label) {
  roundStatus.textContent = label;
}

function syncHiddenView() {
  playerPrompt.textContent = `Player ${state.currentPlayer}, your turn`;
}

function toggleViews({ hidden = false, revealed = false, complete = false }) {
  hiddenView.classList.toggle("is-hidden", !hidden);
  revealView.classList.toggle("is-hidden", !revealed);
  completeView.classList.toggle("is-hidden", !complete);
}

function startRound({ reuseWord = false } = {}) {
  const playerCount = Number(playerCountInput.value);
  if (Number.isNaN(playerCount) || playerCount < 3 || playerCount > 8) {
    setMessage("Player count must be between 3 and 8.", true);
    console.log("[Debug] Invalid player count entered:", playerCount);
    return;
  }

  const previousImposter = state.imposterIndex;

  state.playerCount = playerCount;
  state.currentPlayer = 1;
  state.showCategoryToImposter = categoryToggle.checked;
  state.showHintToImposter = hintToggle.checked;
  state.roundReady = true;

  if (!reuseWord) {
    const category = pickCategory();
    const selection = pickWord(category);
    state.category = category;
    state.word = selection.word;
    state.hint = selection.hint;
  }

  state.imposterIndex = pickImposterIndex(playerCount, previousImposter);

  setMessage("");
  updateStatus("Round in progress");
  syncHiddenView();
  toggleViews({ hidden: true });

  console.log(
    `[Debug] New round started - players: ${playerCount}, imposter: ${state.imposterIndex}, category: ${state.category}, word: ${state.word}, categoryClue: ${state.showCategoryToImposter}, hintClue: ${state.showHintToImposter}`
  );
}

function renderReveal() {
  const isImposter = state.currentPlayer === state.imposterIndex;
  roleTag.textContent = isImposter ? "Imposter" : "Crewmate";
  roleTag.classList.toggle("role-imposter", isImposter);
  roleTag.classList.toggle("role-crewmate", !isImposter);

  if (isImposter) {
    roleHeadline.textContent = "You are the Imposter";
    const clues = [];

    if (state.showCategoryToImposter) {
      clues.push(`<strong>Category:</strong> ${escapeHtml(state.category)}`);
    } else {
      clues.push("<strong>Category:</strong> Hidden this round");
    }

    if (state.showHintToImposter) {
      clues.push(`<strong>Hint:</strong> ${escapeHtml(state.hint)}`);
    } else {
      clues.push("<strong>Hint:</strong> Not shown to Imposter");
    }

    clues.push("Blend in and figure out the secret word.");
    roleDetails.innerHTML = clues.map((item) => `<li>${item}</li>`).join("");
  } else {
    roleHeadline.textContent = "You are a Crewmate";
    const details = [
      `<strong>Word:</strong> ${escapeHtml(state.word)}`,
      `<strong>Category:</strong> ${escapeHtml(state.category)}`,
      `<strong>Hint:</strong> ${escapeHtml(state.hint)}`,
    ];
    roleDetails.innerHTML = details.map((item) => `<li>${item}</li>`).join("");
  }

  console.log(
    `[Debug] Player ${state.currentPlayer} revealed as ${isImposter ? "Imposter" : "Crewmate"}`
  );
}

function revealRole() {
  if (!state.roundReady) {
    setMessage("Start a round first.", true);
    console.log("[Debug] Reveal blocked - round has not been started.");
    return;
  }

  toggleViews({ revealed: true });
  renderReveal();
}

function hideRole() {
  if (state.currentPlayer >= state.playerCount) {
    toggleViews({ complete: true });
    updateStatus("Ready to vote");
    console.log("[Debug] All roles viewed. Begin discussion and voting.");
    return;
  }

  state.currentPlayer += 1;
  syncHiddenView();
  toggleViews({ hidden: true });
}

function saveCustomCategory() {
  const categoryName = normalizeText(customCategoryNameInput.value);
  const entries = parseWordList(customCategoryWordsInput.value);

  if (!categoryName) {
    setMessage("Enter a category name.", true);
    return;
  }

  if (isBuiltInCategory(categoryName)) {
    setMessage("That name is already used by a built-in category.", true);
    return;
  }

  if (entries.length < 2) {
    setMessage("Add at least 2 words to make a custom category.", true);
    return;
  }

  const existingKey = findCustomCategoryKey(categoryName);
  if (existingKey && existingKey !== categoryName) {
    delete state.customCategories[existingKey];
  }

  state.customCategories[categoryName] = entries;
  const saved = saveCustomCategories();
  refreshCategoryOptions(categoryName);
  renderCustomCategoryList();
  categorySelect.value = categoryName;
  if (saved) {
    setMessage(`Saved ${categoryName} locally.`);
  }
}

function clearCustomCategoryForm() {
  customCategoryNameInput.value = "";
  customCategoryWordsInput.value = "";
  setMessage("");
  customCategoryNameInput.focus();
}

function deleteCustomCategory(name) {
  const key = findCustomCategoryKey(name);
  if (!key) {
    return;
  }

  delete state.customCategories[key];
  saveCustomCategories();
  refreshCategoryOptions();
  renderCustomCategoryList();

  if (categorySelect.value === key) {
    categorySelect.value = "random";
  }

  setMessage(`Deleted ${key}.`);
}

function attachHandlers() {
  startRoundButton.addEventListener("click", () => startRound());
  revealButton.addEventListener("click", revealRole);
  hideButton.addEventListener("click", hideRole);
  restartRoundButton.addEventListener("click", () => startRound());
  reshuffleRolesButton.addEventListener("click", () => startRound({ reuseWord: true }));
  saveCategoryButton.addEventListener("click", saveCustomCategory);
  clearCategoryButton.addEventListener("click", clearCustomCategoryForm);

  customCategoryList.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const deleteButton = target ? target.closest("button[data-delete-category]") : null;
    if (!deleteButton) {
      return;
    }

    deleteCustomCategory(deleteButton.dataset.deleteCategory);
  });
}

function init() {
  refreshCategoryOptions();
  renderCustomCategoryList();
  attachHandlers();
  updateStatus("Waiting to start");
  syncHiddenView();
}

init();
