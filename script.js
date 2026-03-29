const APP_VERSION = "v2.1.0";
const CUSTOM_CATEGORY_STORAGE_KEY = "imposter.customCategories.v2";
const USED_WORDS_STORAGE_KEY = "imposter.usedWords.v2";
const SAME_PLAYER_WEIGHT = 0.5;

const categorySelect = document.getElementById("categorySelect");
const playerCountInput = document.getElementById("playerCount");
const imposterCountInput = document.getElementById("imposterCount");
const categoryToggle = document.getElementById("categoryToggle");
const hintToggle = document.getElementById("hintToggle");
const customCategoryToggle = document.getElementById("customCategoryToggle");
const resetWordsButton = document.getElementById("resetWords");
const startRoundButton = document.getElementById("startRound");
const restartRoundButton = document.getElementById("restartRound");
const reshuffleRolesButton = document.getElementById("reshuffleRoles");
const backToSettingsButton = document.getElementById("backToSettings");
const revealButton = document.getElementById("revealButton");
const hideButton = document.getElementById("hideButton");
const setupScreen = document.getElementById("setupScreen");
const gameScreen = document.getElementById("gameScreen");
const hiddenView = document.getElementById("hiddenView");
const revealView = document.getElementById("revealView");
const completeView = document.getElementById("completeView");
const playerPrompt = document.getElementById("playerPrompt");
const roleHeadline = document.getElementById("roleHeadline");
const roleDetails = document.getElementById("roleDetails");
const roleTag = document.getElementById("roleTag");
const roundStatus = document.getElementById("roundStatus");
const setupMessage = document.getElementById("setupMessage");
const appVersionLabel = document.getElementById("appVersion");
const customCategorySection = document.getElementById("customCategorySection");
const customCategoryDisabledNote = document.getElementById("customCategoryDisabledNote");
const customCategoryNameInput = document.getElementById("customCategoryName");
const wordEntryInput = document.getElementById("wordEntryInput");
const addWordButton = document.getElementById("addWordButton");
const wordChipList = document.getElementById("wordChipList");
const saveCategoryButton = document.getElementById("saveCategory");
const clearCategoryButton = document.getElementById("clearCategory");
const customCategoryList = document.getElementById("customCategoryList");

const BUILT_IN_CATEGORIES = {
  Food: [
    { word: "Pizza", hint: "Cheesy, triangular slices" },
    { word: "Sushi", hint: "Rice rolled with seaweed" },
    { word: "Taco", hint: "Folded and filled tortilla" },
    { word: "Pancakes", hint: "Breakfast stack with syrup" },
    { word: "Guacamole", hint: "Creamy avocado dip" },
    { word: "Burger", hint: "Layered bun and patty" },
  ],
  Animals: [
    { word: "Elephant", hint: "Massive, with a trunk" },
    { word: "Penguin", hint: "Flightless bird in tuxedo" },
    { word: "Kangaroo", hint: "Jumps with a pouch" },
    { word: "Giraffe", hint: "Very long neck" },
    { word: "Dolphin", hint: "Smart ocean acrobat" },
    { word: "Octopus", hint: "Eight-armed sea creature" },
  ],
  Travel: [
    { word: "Passport", hint: "Tiny booklet for borders" },
    { word: "Suitcase", hint: "Rolling travel companion" },
    { word: "Compass", hint: "Points you north" },
    { word: "Hostel", hint: "Budget traveler bed" },
    { word: "Ticket", hint: "Admits you aboard" },
    { word: "Airport", hint: "Flights arrive and depart" },
  ],
  Sports: [
    { word: "Basketball", hint: "Orange ball, tall hoop" },
    { word: "Tennis", hint: "Rackets and a net" },
    { word: "Soccer", hint: "World's most played game" },
    { word: "Hockey", hint: "Ice, sticks, and puck" },
    { word: "Volleyball", hint: "Bump, set, spike" },
    { word: "Cricket", hint: "Bat, wicket, and overs" },
  ],
  Movies: [
    { word: "Director", hint: "Calls action" },
    { word: "Popcorn", hint: "Buttery theater snack" },
    { word: "Trailer", hint: "Preview before the film" },
    { word: "Credits", hint: "Roll at the end" },
    { word: "Sequel", hint: "Next installment" },
    { word: "Premiere", hint: "First public screening" },
  ],
  "CS:GO": [
    { word: "Dust2", hint: "Classic map" },
    { word: "AWP", hint: "Sniper rifle" },
    { word: "Clutch", hint: "Winning alone" },
    { word: "Eco", hint: "Low-money round" },
    { word: "Bombsite", hint: "Plant location" },
    { word: "Flashbang", hint: "Temporary blind grenade" },
  ],
};

const state = {
  playerCount: 6,
  imposterCount: 1,
  currentPlayer: 1,
  imposterIndices: [1],
  category: "",
  word: "",
  hint: "",
  showCategoryToImposter: true,
  showHintToImposter: false,
  roundReady: false,
  customCategoryEnabled: true,
  customCategories: loadCustomCategories(),
  usedWords: loadUsedWords(),
  draftEntries: [],
};

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

function setMessage(message, isError = false) {
  if (!message) {
    setupMessage.classList.add("message-hidden");
    setupMessage.classList.remove("message-error");
    setupMessage.textContent = "";
    return;
  }

  setupMessage.textContent = message;
  setupMessage.classList.remove("message-hidden");
  setupMessage.classList.toggle("message-error", isError);
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
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

    const key = word.toLowerCase();
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    normalized.push({ word, hint });
  });

  return normalized;
}

function isBuiltInCategory(name) {
  const target = normalizeText(name).toLowerCase();
  return Object.keys(BUILT_IN_CATEGORIES).some(
    (categoryName) => categoryName.toLowerCase() === target
  );
}

function loadCustomCategories() {
  try {
    const raw = localStorage.getItem(CUSTOM_CATEGORY_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const categories = {};
    Object.entries(parsed).forEach(([name, entries]) => {
      const categoryName = normalizeText(name);
      if (!categoryName || isBuiltInCategory(categoryName) || !Array.isArray(entries)) {
        return;
      }

      const normalized = normalizeEntries(entries);
      if (normalized.length > 1) {
        categories[categoryName] = normalized;
      }
    });

    return categories;
  } catch (error) {
    console.warn("[Debug] Failed loading custom categories:", error);
    return {};
  }
}

function saveCustomCategories() {
  try {
    localStorage.setItem(CUSTOM_CATEGORY_STORAGE_KEY, JSON.stringify(state.customCategories));
    return true;
  } catch (error) {
    console.warn("[Debug] Failed saving custom categories:", error);
    setMessage("Could not save categories in this browser.", true);
    return false;
  }
}

function loadUsedWords() {
  try {
    const raw = localStorage.getItem(USED_WORDS_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const normalized = {};
    Object.entries(parsed).forEach(([categoryKey, words]) => {
      if (!Array.isArray(words)) {
        return;
      }

      const uniqueWords = Array.from(
        new Set(words.map((word) => normalizeText(word).toLowerCase()).filter(Boolean))
      );

      if (uniqueWords.length > 0) {
        normalized[normalizeText(categoryKey).toLowerCase()] = uniqueWords;
      }
    });

    return normalized;
  } catch (error) {
    console.warn("[Debug] Failed loading used words:", error);
    return {};
  }
}

function saveUsedWords() {
  try {
    localStorage.setItem(USED_WORDS_STORAGE_KEY, JSON.stringify(state.usedWords));
  } catch (error) {
    console.warn("[Debug] Failed saving used words:", error);
  }
}

function getAvailableCategoryNames() {
  const builtInNames = Object.keys(BUILT_IN_CATEGORIES);
  if (!state.customCategoryEnabled) {
    return builtInNames;
  }

  return builtInNames.concat(Object.keys(state.customCategories));
}

function getCategoryBank() {
  if (!state.customCategoryEnabled) {
    return { ...BUILT_IN_CATEGORIES };
  }

  return {
    ...BUILT_IN_CATEGORIES,
    ...state.customCategories,
  };
}

function categoryExists(name) {
  const target = normalizeText(name).toLowerCase();
  return getAvailableCategoryNames().some(
    (categoryName) => categoryName.toLowerCase() === target
  );
}

function findCustomCategoryKey(name) {
  const target = normalizeText(name).toLowerCase();
  return Object.keys(state.customCategories).find(
    (categoryName) => categoryName.toLowerCase() === target
  );
}

function refreshCategoryOptions(selectedCategory = categorySelect.value) {
  const names = getAvailableCategoryNames();
  categorySelect.innerHTML = "";

  const randomOption = document.createElement("option");
  randomOption.value = "random";
  randomOption.textContent = "Random category";
  categorySelect.appendChild(randomOption);

  const builtInGroup = document.createElement("optgroup");
  builtInGroup.label = "Built-in categories";
  Object.keys(BUILT_IN_CATEGORIES).forEach((categoryName) => {
    const option = document.createElement("option");
    option.value = categoryName;
    option.textContent = categoryName;
    builtInGroup.appendChild(option);
  });
  categorySelect.appendChild(builtInGroup);

  if (state.customCategoryEnabled && Object.keys(state.customCategories).length > 0) {
    const customGroup = document.createElement("optgroup");
    customGroup.label = "Custom categories";

    Object.keys(state.customCategories).forEach((categoryName) => {
      const option = document.createElement("option");
      option.value = categoryName;
      option.textContent = categoryName;
      customGroup.appendChild(option);
    });

    categorySelect.appendChild(customGroup);
  }

  if (selectedCategory === "random") {
    categorySelect.value = "random";
    return;
  }

  if (selectedCategory && names.includes(selectedCategory)) {
    categorySelect.value = selectedCategory;
  } else {
    categorySelect.value = "random";
  }
}

function syncImposterCountBounds() {
  const parsedPlayers = Number(playerCountInput.value);
  const fallbackPlayers = Number.isNaN(parsedPlayers) ? state.playerCount : parsedPlayers;
  const maxImposters = Math.max(1, Math.min(3, fallbackPlayers - 1));
  imposterCountInput.max = String(maxImposters);

  const currentImposterCount = Number(imposterCountInput.value);
  if (Number.isNaN(currentImposterCount) || currentImposterCount < 1) {
    imposterCountInput.value = "1";
  } else if (currentImposterCount > maxImposters) {
    imposterCountInput.value = String(maxImposters);
  }
}

function tokenizeByDelimitersWithQuotes(rawText) {
  const tokens = [];
  let currentToken = "";
  let quoteChar = "";

  for (const char of String(rawText || "")) {
    const isQuote = char === '"' || char === "'";
    const isDelimiter = /[\s,;]+/.test(char);

    if (isQuote) {
      if (!quoteChar) {
        quoteChar = char;
        continue;
      }
      if (quoteChar === char) {
        quoteChar = "";
        continue;
      }
    }

    if (!quoteChar && isDelimiter) {
      const cleaned = normalizeText(currentToken);
      if (cleaned) {
        tokens.push(cleaned);
      }
      currentToken = "";
      continue;
    }

    currentToken += char;
  }

  const trailing = normalizeText(currentToken);
  if (trailing) {
    tokens.push(trailing);
  }

  return tokens;
}

function parseEntryToken(token) {
  const trimmed = normalizeText(token);
  if (!trimmed) {
    return null;
  }

  const separators = ["|", "=>"];
  for (const separator of separators) {
    const separatorIndex = trimmed.indexOf(separator);
    if (separatorIndex > 0) {
      return {
        word: trimmed.slice(0, separatorIndex),
        hint: trimmed.slice(separatorIndex + separator.length),
      };
    }
  }

  return { word: trimmed, hint: "" };
}

function parseEntriesFromRaw(rawText) {
  return tokenizeByDelimitersWithQuotes(rawText)
    .map((token) => parseEntryToken(token))
    .filter(Boolean);
}

function renderDraftEntries() {
  wordChipList.innerHTML = "";

  if (state.draftEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chip-empty";
    empty.textContent = "No words added yet.";
    wordChipList.appendChild(empty);
    return;
  }

  state.draftEntries.forEach((entry, index) => {
    const chip = document.createElement("div");
    chip.className = "chip";

    const label = document.createElement("span");
    label.className = "chip-text";
    label.textContent = entry.hint ? `${entry.word} (${entry.hint})` : entry.word;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "chip-remove";
    removeButton.dataset.removeIndex = String(index);
    removeButton.textContent = "x";

    chip.appendChild(label);
    chip.appendChild(removeButton);
    wordChipList.appendChild(chip);
  });
}

function addDraftEntriesFromRaw(rawText) {
  const parsedEntries = parseEntriesFromRaw(rawText);
  if (parsedEntries.length === 0) {
    return 0;
  }

  const previousLength = state.draftEntries.length;
  state.draftEntries = normalizeEntries(state.draftEntries.concat(parsedEntries));
  renderDraftEntries();
  return state.draftEntries.length - previousLength;
}

function clearDraftBuilder() {
  customCategoryNameInput.value = "";
  wordEntryInput.value = "";
  state.draftEntries = [];
  renderDraftEntries();
  setMessage("");
}

function renderCustomCategoryList() {
  customCategoryList.innerHTML = "";
  const categoryNames = Object.keys(state.customCategories);

  if (categoryNames.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted small";
    empty.textContent = "No custom categories saved yet.";
    customCategoryList.appendChild(empty);
    return;
  }

  categoryNames.forEach((categoryName) => {
    const entries = state.customCategories[categoryName];

    const row = document.createElement("div");
    row.className = "saved-category-item";

    const info = document.createElement("div");
    info.className = "saved-category-info";

    const title = document.createElement("strong");
    title.textContent = categoryName;

    const meta = document.createElement("p");
    meta.className = "muted small";
    meta.textContent = `${entries.length} words`;

    info.appendChild(title);
    info.appendChild(meta);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "ghost danger";
    deleteButton.dataset.deleteCategory = categoryName;
    deleteButton.textContent = "Delete";

    row.appendChild(info);
    row.appendChild(deleteButton);
    customCategoryList.appendChild(row);
  });
}

function updateCustomCategoryVisibility() {
  state.customCategoryEnabled = customCategoryToggle.checked;

  customCategorySection.classList.toggle("is-hidden", !state.customCategoryEnabled);
  customCategoryDisabledNote.classList.toggle("is-hidden", state.customCategoryEnabled);

  refreshCategoryOptions(categorySelect.value);
}

function pickCategory() {
  const availableCategories = getAvailableCategoryNames();
  if (availableCategories.length === 0) {
    return "";
  }

  const selected = categorySelect.value;
  if (selected === "random") {
    return randomItem(availableCategories);
  }

  if (categoryExists(selected)) {
    return selected;
  }

  return availableCategories[0];
}

function pickWord(categoryName) {
  const bank = getCategoryBank();
  const entries = bank[categoryName] || [];
  if (entries.length === 0) {
    return null;
  }

  const usedKey = categoryName.toLowerCase();
  const usedWords = new Set((state.usedWords[usedKey] || []).map((word) => word.toLowerCase()));

  let candidates = entries.filter((entry) => !usedWords.has(entry.word.toLowerCase()));
  if (candidates.length === 0) {
    state.usedWords[usedKey] = [];
    candidates = entries;
  }

  const pickedEntry = randomItem(candidates);
  const nextUsedWords = new Set(state.usedWords[usedKey] || []);
  nextUsedWords.add(pickedEntry.word.toLowerCase());
  state.usedWords[usedKey] = Array.from(nextUsedWords);
  saveUsedWords();

  return {
    word: pickedEntry.word,
    hint: pickedEntry.hint || "No hint provided",
  };
}

function pickImposterIndices(playerCount, imposterCount, previousImposters) {
  const pool = [];

  for (let player = 1; player <= playerCount; player += 1) {
    pool.push({
      player,
      weight: previousImposters.includes(player) ? SAME_PLAYER_WEIGHT : 1,
    });
  }

  const result = [];
  while (result.length < imposterCount && pool.length > 0) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * totalWeight;
    let selectedIndex = pool.length - 1;

    for (let index = 0; index < pool.length; index += 1) {
      roll -= pool[index].weight;
      if (roll < 0) {
        selectedIndex = index;
        break;
      }
    }

    result.push(pool[selectedIndex].player);
    pool.splice(selectedIndex, 1);
  }

  return result.sort((a, b) => a - b);
}

function updateStatus(label) {
  roundStatus.textContent = label;
}

function syncHiddenView() {
  playerPrompt.textContent = `Player ${state.currentPlayer} of ${state.playerCount}, your turn`;
}

function toggleRoundCards({ hidden = false, revealed = false, complete = false }) {
  hiddenView.classList.toggle("is-hidden", !hidden);
  revealView.classList.toggle("is-hidden", !revealed);
  completeView.classList.toggle("is-hidden", !complete);
}

function showSetupScreen() {
  document.body.classList.remove("mode-game");
  setupScreen.classList.remove("is-hidden");
  gameScreen.classList.add("is-hidden");
}

function showGameScreen() {
  document.body.classList.add("mode-game");
  setupScreen.classList.add("is-hidden");
  gameScreen.classList.remove("is-hidden");
}

function renderReveal() {
  const isImposter = state.imposterIndices.includes(state.currentPlayer);
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
      clues.push("<strong>Hint:</strong> Hidden this round");
    }

    roleDetails.innerHTML = clues.map((item) => `<li>${item}</li>`).join("");
    return;
  }

  roleHeadline.textContent = "You are a Crewmate";
  roleDetails.innerHTML = `<li><strong>Secret word:</strong> <span class="secret-word-value">${escapeHtml(
    state.word
  )}</span></li>`;
}

function startRound({ reuseWord = false } = {}) {
  const playerCount = Number(playerCountInput.value);
  if (Number.isNaN(playerCount) || playerCount < 3 || playerCount > 12) {
    setMessage("Player count must be between 3 and 12.", true);
    return;
  }

  syncImposterCountBounds();
  const imposterCount = Number(imposterCountInput.value);
  if (Number.isNaN(imposterCount) || imposterCount < 1 || imposterCount >= playerCount) {
    setMessage("Imposter count must be at least 1 and less than player count.", true);
    return;
  }

  const shouldReuseWord = reuseWord && state.word && state.category;
  const previousImposters = state.imposterIndices.slice();
  state.playerCount = playerCount;
  state.imposterCount = imposterCount;
  state.currentPlayer = 1;
  state.showCategoryToImposter = categoryToggle.checked;
  state.showHintToImposter = hintToggle.checked;

  if (!shouldReuseWord) {
    const pickedCategory = pickCategory();
    if (!pickedCategory) {
      setMessage("No categories available. Enable categories and try again.", true);
      return;
    }

    const pickedWord = pickWord(pickedCategory);
    if (!pickedWord) {
      setMessage("That category has no words. Pick another category.", true);
      return;
    }

    state.category = pickedCategory;
    state.word = pickedWord.word;
    state.hint = pickedWord.hint;
  }

  state.imposterIndices = pickImposterIndices(playerCount, imposterCount, previousImposters);
  state.roundReady = true;

  setMessage("");
  updateStatus("Round in progress");
  syncHiddenView();
  toggleRoundCards({ hidden: true });
  showGameScreen();

  console.log(
    `[Debug] Round started - players: ${playerCount}, imposters: ${state.imposterIndices.join(",")}, category: ${state.category}, word: ${state.word}`
  );
}

function revealRole() {
  if (!state.roundReady) {
    setMessage("Start a round first.", true);
    return;
  }

  toggleRoundCards({ revealed: true });
  renderReveal();
}

function hideRole() {
  if (state.currentPlayer >= state.playerCount) {
    toggleRoundCards({ complete: true });
    updateStatus("Vote time");
    return;
  }

  state.currentPlayer += 1;
  syncHiddenView();
  toggleRoundCards({ hidden: true });
}

function saveCustomCategory() {
  if (normalizeText(wordEntryInput.value)) {
    addDraftEntriesFromRaw(wordEntryInput.value);
    wordEntryInput.value = "";
  }

  const categoryName = normalizeText(customCategoryNameInput.value);
  if (!categoryName) {
    setMessage("Enter a category name.", true);
    return;
  }

  if (isBuiltInCategory(categoryName)) {
    setMessage("That name is reserved by a built-in category.", true);
    return;
  }

  if (state.draftEntries.length < 2) {
    setMessage("Add at least 2 words before saving.", true);
    return;
  }

  const existingKey = findCustomCategoryKey(categoryName);
  if (existingKey && existingKey !== categoryName) {
    delete state.customCategories[existingKey];
  }

  state.customCategories[categoryName] = normalizeEntries(state.draftEntries);
  if (!saveCustomCategories()) {
    return;
  }

  refreshCategoryOptions(categoryName);
  renderCustomCategoryList();
  clearDraftBuilder();
  categorySelect.value = categoryName;
  setMessage(`Saved custom category: ${categoryName}`);
}

function deleteCustomCategory(categoryName) {
  const key = findCustomCategoryKey(categoryName);
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

  setMessage(`Deleted custom category: ${key}`);
}

function resetUsedWords() {
  state.usedWords = {};
  saveUsedWords();
  setMessage("Used-word history cleared.");
}

function attachHandlers() {
  startRoundButton.addEventListener("click", () => startRound());
  revealButton.addEventListener("click", revealRole);
  hideButton.addEventListener("click", hideRole);
  restartRoundButton.addEventListener("click", () => startRound());
  reshuffleRolesButton.addEventListener("click", () => startRound({ reuseWord: true }));
  backToSettingsButton.addEventListener("click", showSetupScreen);

  playerCountInput.addEventListener("input", syncImposterCountBounds);
  customCategoryToggle.addEventListener("change", updateCustomCategoryVisibility);
  resetWordsButton.addEventListener("click", resetUsedWords);

  addWordButton.addEventListener("click", () => {
    const addedCount = addDraftEntriesFromRaw(wordEntryInput.value);
    wordEntryInput.value = "";
    if (addedCount === 0) {
      setMessage("Enter at least one valid word before adding.", true);
    } else {
      setMessage("");
    }
  });

  wordEntryInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    const addedCount = addDraftEntriesFromRaw(wordEntryInput.value);
    wordEntryInput.value = "";

    if (addedCount === 0) {
      setMessage("Enter at least one valid word before adding.", true);
    } else {
      setMessage("");
    }
  });

  wordChipList.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const removeButton = target ? target.closest("button[data-remove-index]") : null;
    if (!removeButton) {
      return;
    }

    const index = Number(removeButton.dataset.removeIndex);
    if (Number.isNaN(index)) {
      return;
    }

    state.draftEntries.splice(index, 1);
    renderDraftEntries();
  });

  saveCategoryButton.addEventListener("click", saveCustomCategory);
  clearCategoryButton.addEventListener("click", clearDraftBuilder);

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
  appVersionLabel.textContent = APP_VERSION;
  syncImposterCountBounds();
  refreshCategoryOptions("random");
  renderDraftEntries();
  renderCustomCategoryList();
  updateCustomCategoryVisibility();
  attachHandlers();
  updateStatus("Waiting to start");
  syncHiddenView();
  showSetupScreen();
}

init();
