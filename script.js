const categorySelect = document.getElementById("categorySelect");
const languageSelect = document.getElementById("languageSelect");
const playerCountInput = document.getElementById("playerCount");
const categoryToggle = document.getElementById("categoryToggle");
const hintToggle = document.getElementById("hintToggle");
const crewCategoryToggle = document.getElementById("crewCategoryToggle");
const crewHintToggle = document.getElementById("crewHintToggle");
const autoStarterToggle = document.getElementById("autoStarterToggle");
const resetWordsButton = document.getElementById("resetWords");
const startRoundButton = document.getElementById("startRound");
const revealButton = document.getElementById("revealButton");
const hideButton = document.getElementById("hideButton");
const restartRoundButton = document.getElementById("restartRound");
const reshuffleRolesButton = document.getElementById("reshuffleRoles");
const editSettingsButton = document.getElementById("editSettings");
const pickStarterButton = document.getElementById("pickStarter");
const starterResult = document.getElementById("starterResult");
const appHeader = document.getElementById("appHeader");
const setupPanel = document.getElementById("setupPanel");
const revealPanel = document.getElementById("revealPanel");
const hiddenView = document.getElementById("hiddenView");
const revealView = document.getElementById("revealView");
const completeView = document.getElementById("completeView");
const playerPrompt = document.getElementById("playerPrompt");
const roleHeadline = document.getElementById("roleHeadline");
const roleDetails = document.getElementById("roleDetails");
const roleTag = document.getElementById("roleTag");
const roundStatus = document.getElementById("roundStatus");
const setupMessage = document.getElementById("setupMessage");

const WORD_BANK = {
  en: {
    Food: [
      { word: "Pizza", hint: "Triangle" },
      { word: "Sushi", hint: "Rolls" },
      { word: "Taco", hint: "Tuesday" },
      { word: "Pancakes", hint: "Stack" },
      { word: "Guacamole", hint: "Avocado" },
      { word: "Burger", hint: "Patty" },
      { word: "Spaghetti", hint: "Twirl" },
      { word: "Salad", hint: "Greens" },
      { word: "Donut", hint: "Glazed" },
      { word: "Soup", hint: "Broth" },
      { word: "Sandwich", hint: "Slices" },
      { word: "Fries", hint: "Salted" },
      { word: "Apple", hint: "Orchard" },
      { word: "Chocolate", hint: "Cocoa" },
      { word: "Cheese", hint: "Dairy" },
      { word: "Burrito", hint: "Wrapped" },
      { word: "Ice Cream", hint: "Frozen" },
      { word: "Steak", hint: "Sear" },
      { word: "Noodles", hint: "Slurp" },
      { word: "Hot Dog", hint: "Ballpark" },
    ],
    Animals: [
      { word: "Elephant", hint: "Tusks" },
      { word: "Penguin", hint: "Tuxedo" },
      { word: "Kangaroo", hint: "Pouch" },
      { word: "Giraffe", hint: "Spots" },
      { word: "Dolphin", hint: "Clicks" },
      { word: "Panda", hint: "Bamboo" },
      { word: "Owl", hint: "Night" },
      { word: "Zebra", hint: "Stripes" },
      { word: "Otter", hint: "River" },
      { word: "Fox", hint: "Clever" },
      { word: "Cat", hint: "Purr" },
      { word: "Dog", hint: "Fetch" },
      { word: "Rabbit", hint: "Carrots" },
      { word: "Turtle", hint: "Shell" },
      { word: "Bear", hint: "Hibernate" },
      { word: "Whale", hint: "Song" },
      { word: "Parrot", hint: "Mimic" },
      { word: "Horse", hint: "Saddle" },
      { word: "Lion", hint: "Pride" },
      { word: "Sheep", hint: "Wool" },
    ],
    Travel: [
      { word: "Passport", hint: "Stamps" },
      { word: "Suitcase", hint: "Carry" },
      { word: "Compass", hint: "Needle" },
      { word: "Hostel", hint: "Bunks" },
      { word: "Ticket", hint: "Admit" },
      { word: "Map", hint: "Folded" },
      { word: "Train", hint: "Platform" },
      { word: "Airport", hint: "Terminal" },
      { word: "Taxi", hint: "Meter" },
      { word: "Backpack", hint: "Straps" },
      { word: "Hotel", hint: "Keycard" },
      { word: "Beach", hint: "Towels" },
      { word: "Cruise", hint: "Deck" },
      { word: "Bus", hint: "Route" },
      { word: "Guidebook", hint: "Notes" },
      { word: "Postcard", hint: "Mailed" },
      { word: "Ferry", hint: "Cars" },
      { word: "Mountain", hint: "Summit" },
      { word: "Sunscreen", hint: "SPF" },
      { word: "Pillow", hint: "Neck" },
    ],
    Sports: [
      { word: "Basketball", hint: "Dribble" },
      { word: "Tennis", hint: "Serve" },
      { word: "Soccer", hint: "Striker" },
      { word: "Hockey", hint: "Puck" },
      { word: "Volleyball", hint: "Spike" },
      { word: "Baseball", hint: "Diamond" },
      { word: "Golf", hint: "Putter" },
      { word: "Bowling", hint: "Strike" },
      { word: "Cycling", hint: "Peloton" },
      { word: "Running", hint: "Sprint" },
      { word: "Swimming", hint: "Lanes" },
      { word: "Skateboard", hint: "Ramp" },
      { word: "Yoga", hint: "Pose" },
      { word: "Surfing", hint: "Wave" },
      { word: "Table Tennis", hint: "Spin" },
      { word: "Badminton", hint: "Shuttle" },
      { word: "Rugby", hint: "Scrum" },
      { word: "Boxing", hint: "Ring" },
      { word: "Skiing", hint: "Slopes" },
      { word: "Jump Rope", hint: "Double" },
    ],
    Movies: [
      { word: "Star Wars", hint: "Saber" },
      { word: "Harry Potter", hint: "Hogwarts" },
      { word: "Marvel", hint: "Avengers" },
      { word: "Frozen", hint: "Snowman" },
      { word: "Jurassic Park", hint: "Raptors" },
      { word: "The Godfather", hint: "Family" },
      { word: "Toy Story", hint: "Cowboy" },
      { word: "Batman", hint: "Gotham" },
      { word: "James Bond", hint: "007" },
      { word: "Shrek", hint: "Swamp" },
      { word: "Spider-Man", hint: "Webs" },
      { word: "Finding Nemo", hint: "Clownfish" },
      { word: "Pirates of the Caribbean", hint: "Jack" },
      { word: "The Matrix", hint: "Neo" },
      { word: "Lord of the Rings", hint: "Ring" },
      { word: "Rocky", hint: "Steps" },
      { word: "Inception", hint: "Totem" },
      { word: "Back to the Future", hint: "Delorean" },
      { word: "Ghostbusters", hint: "Proton" },
      { word: "Black Panther", hint: "Wakanda" },
    ],
  },
  de: {
    Food: [
      { word: "Pizza", hint: "Dreieck" },
      { word: "Sushi", hint: "Rollen" },
      { word: "Taco", hint: "Dienstag" },
      { word: "Pfannkuchen", hint: "Stapel" },
      { word: "Guacamole", hint: "Avocado" },
      { word: "Burger", hint: "Patty" },
      { word: "Spaghetti", hint: "Gabel" },
      { word: "Salat", hint: "Blätter" },
      { word: "Donut", hint: "Zuckerguss" },
      { word: "Suppe", hint: "Brühe" },
      { word: "Sandwich", hint: "Scheiben" },
      { word: "Pommes", hint: "Salz" },
      { word: "Apfel", hint: "Obstgarten" },
      { word: "Schokolade", hint: "Kakao" },
      { word: "Käse", hint: "Milchig" },
      { word: "Burrito", hint: "Gerollt" },
      { word: "Eis", hint: "Kalt" },
      { word: "Steak", hint: "Braten" },
      { word: "Nudeln", hint: "Schlürfen" },
      { word: "Hotdog", hint: "Stadion" },
    ],
    Animals: [
      { word: "Elefant", hint: "Stoßzahn" },
      { word: "Pinguin", hint: "Frack" },
      { word: "Känguru", hint: "Beutel" },
      { word: "Giraffe", hint: "Flecken" },
      { word: "Delfin", hint: "Klicken" },
      { word: "Panda", hint: "Bambus" },
      { word: "Eule", hint: "Nacht" },
      { word: "Zebra", hint: "Streifen" },
      { word: "Otter", hint: "Fluss" },
      { word: "Fuchs", hint: "Schlau" },
      { word: "Katze", hint: "Schnurren" },
      { word: "Hund", hint: "Apport" },
      { word: "Kaninchen", hint: "Möhre" },
      { word: "Schildkröte", hint: "Panzer" },
      { word: "Bär", hint: "Winterschlaf" },
      { word: "Wal", hint: "Gesang" },
      { word: "Papagei", hint: "Nachahmen" },
      { word: "Pferd", hint: "Sattel" },
      { word: "Löwe", hint: "Rudel" },
      { word: "Schaf", hint: "Wolle" },
    ],
    Travel: [
      { word: "Reisepass", hint: "Stempel" },
      { word: "Koffer", hint: "Tragen" },
      { word: "Kompass", hint: "Nadel" },
      { word: "Hostel", hint: "Mehrbett" },
      { word: "Ticket", hint: "Einlass" },
      { word: "Karte", hint: "Gefaltet" },
      { word: "Zug", hint: "Gleis" },
      { word: "Flughafen", hint: "Terminal" },
      { word: "Taxi", hint: "Taxameter" },
      { word: "Rucksack", hint: "Träger" },
      { word: "Hotel", hint: "Schlüsselkarte" },
      { word: "Strand", hint: "Handtuch" },
      { word: "Kreuzfahrt", hint: "Deck" },
      { word: "Bus", hint: "Linie" },
      { word: "Reiseführer", hint: "Notizen" },
      { word: "Postkarte", hint: "Gruß" },
      { word: "Fähre", hint: "Autos" },
      { word: "Berg", hint: "Gipfel" },
      { word: "Sonnencreme", hint: "Schutz" },
      { word: "Kissen", hint: "Nacken" },
    ],
    Sports: [
      { word: "Basketball", hint: "Dribbeln" },
      { word: "Tennis", hint: "Aufschlag" },
      { word: "Fußball", hint: "Stürmer" },
      { word: "Eishockey", hint: "Puck" },
      { word: "Volleyball", hint: "Block" },
      { word: "Baseball", hint: "Diamant" },
      { word: "Golf", hint: "Putter" },
      { word: "Bowling", hint: "Strike" },
      { word: "Radfahren", hint: "Peloton" },
      { word: "Laufen", hint: "Sprint" },
      { word: "Schwimmen", hint: "Bahnen" },
      { word: "Skateboard", hint: "Rampe" },
      { word: "Yoga", hint: "Pose" },
      { word: "Surfen", hint: "Welle" },
      { word: "Tischtennis", hint: "Spin" },
      { word: "Badminton", hint: "Federball" },
      { word: "Rugby", hint: "Gedränge" },
      { word: "Boxen", hint: "Ring" },
      { word: "Skifahren", hint: "Piste" },
      { word: "Seilspringen", hint: "Doppel" },
    ],
    Movies: [
      { word: "Star Wars", hint: "Lichtschwert" },
      { word: "Harry Potter", hint: "Hogwarts" },
      { word: "Marvel", hint: "Avengers" },
      { word: "Die Eiskönigin", hint: "Schneemann" },
      { word: "Jurassic Park", hint: "Raptoren" },
      { word: "Der Pate", hint: "Familie" },
      { word: "Toy Story", hint: "Cowboy" },
      { word: "Batman", hint: "Gotham" },
      { word: "James Bond", hint: "007" },
      { word: "Shrek", hint: "Sumpf" },
      { word: "Spider-Man", hint: "Netze" },
      { word: "Findet Nemo", hint: "Clownfisch" },
      { word: "Fluch der Karibik", hint: "Jack" },
      { word: "Matrix", hint: "Neo" },
      { word: "Der Herr der Ringe", hint: "Ring" },
      { word: "Rocky", hint: "Treppen" },
      { word: "Inception", hint: "Kreisel" },
      { word: "Zurück in die Zukunft", hint: "Delorean" },
      { word: "Ghostbusters", hint: "Protonen" },
      { word: "Black Panther", hint: "Wakanda" },
    ],
  },
};

const state = {
  playerCount: 6,
  currentPlayer: 1,
  imposterIndex: 1,
  category: "",
  word: "",
  hint: "",
  language: "en",
  showCategoryToImposter: true,
  showHintToImposter: false,
  showCategoryToCrewmate: false,
  showHintToCrewmate: false,
  autoPickStarter: false,
  roundReady: false,
};

function storageKeyForLanguage(lang) {
  return `imposter_used_words_${lang}`;
}

function loadUsedWords(lang) {
  try {
    const raw = localStorage.getItem(storageKeyForLanguage(lang));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
    console.log("[Debug] Failed to load used words from storage:", error);
    return new Set();
  }
}

function saveUsedWords(lang, usedSet) {
  try {
    localStorage.setItem(storageKeyForLanguage(lang), JSON.stringify(Array.from(usedSet)));
  } catch (error) {
    console.log("[Debug] Failed to save used words to storage:", error);
  }
}

function resetUsedWords(lang, silent = false) {
  try {
    localStorage.removeItem(storageKeyForLanguage(lang));
    if (!silent) {
      setMessage("Word pool reset for this language.", false);
    }
  } catch (error) {
    console.log("[Debug] Failed to reset used words:", error);
  }
}

function initCategoryOptions() {
  categorySelect.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const randomOption = document.createElement("option");
  randomOption.value = "random";
  randomOption.textContent = "Random category";
  fragment.appendChild(randomOption);

  Object.keys(WORD_BANK[state.language]).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    fragment.appendChild(option);
  });

  categorySelect.appendChild(fragment);
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickCategory() {
  const choice = categorySelect.value;
  if (choice === "random") {
    return randomItem(Object.keys(WORD_BANK[state.language]));
  }
  return choice;
}

function pickWord(category, language) {
  const usedWords = loadUsedWords(language);
  const pool = WORD_BANK[language][category];
  let available = pool.filter((item) => !usedWords.has(item.word));
  if (available.length === 0) {
    resetUsedWords(language, true);
    setMessage("All words used for this language. Pool reset automatically.", false);
    available = pool.slice();
    usedWords.clear();
  }
  const entry = randomItem(available);
  usedWords.add(entry.word);
  saveUsedWords(language, usedWords);
  console.log(
    `[Debug] Word picked for ${language}/${category}: ${entry.word}. Used count: ${usedWords.size}/${pool.length}`
  );
  return { word: entry.word, hint: entry.hint };
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

function showSetupPanel() {
  setupPanel.classList.remove("is-hidden");
  setupPanel.removeAttribute("aria-hidden");
  setupPanel.hidden = false;
  revealPanel.classList.add("is-hidden");
  revealPanel.setAttribute("aria-hidden", "true");
  revealPanel.hidden = true;
  appHeader.classList.remove("header-hidden");
  updateStatus("Waiting to start");
  toggleViews({ hidden: true });
  state.roundReady = false;
  state.currentPlayer = 1;
  syncHiddenView();
  console.log("[Debug] Returned to setup — adjust settings and start again.");
}

function showRevealPanel() {
  setupPanel.classList.add("is-hidden");
  setupPanel.setAttribute("aria-hidden", "true");
  setupPanel.hidden = true;
  revealPanel.classList.remove("is-hidden");
  revealPanel.removeAttribute("aria-hidden");
  revealPanel.hidden = false;
  appHeader.classList.add("header-hidden");
  console.log("[Debug] Switched to role reveal panel.");
}

function startRound({ reuseWord = false } = {}) {
  const playerCount = Number(playerCountInput.value);
  if (Number.isNaN(playerCount) || playerCount < 3 || playerCount > 8) {
    setMessage("Player count must be between 3 and 8.", true);
    console.log("[Debug] Invalid player count entered:", playerCount);
    return;
  }

  state.playerCount = playerCount;
  state.currentPlayer = 1;
  state.language = languageSelect.value;
  state.showCategoryToImposter = categoryToggle.checked;
  state.showHintToImposter = hintToggle.checked;
  state.showCategoryToCrewmate = crewCategoryToggle.checked;
  state.showHintToCrewmate = crewHintToggle.checked;
  state.autoPickStarter = autoStarterToggle.checked;
  state.roundReady = true;
  state.imposterIndex = Math.floor(Math.random() * playerCount) + 1;

  if (!reuseWord) {
    const category = pickCategory();
    const selection = pickWord(category, state.language);
    state.category = category;
    state.word = selection.word;
    state.hint = selection.hint;
  }

  setMessage("");
  updateStatus("Round in progress");
  syncHiddenView();
  toggleViews({ hidden: true });
  showRevealPanel();
  console.log(
    `[Debug] New round started — players: ${playerCount}, language: ${state.language}, imposter: ${state.imposterIndex}, category: ${state.category}, word: ${state.word}, categoryClue: ${state.showCategoryToImposter}, hintClue: ${state.showHintToImposter}, crewCategory: ${state.showCategoryToCrewmate}, crewHint: ${state.showHintToCrewmate}, autoStarter: ${state.autoPickStarter}`
  );
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

function renderReveal() {
  const isImposter = state.currentPlayer === state.imposterIndex;
  roleTag.textContent = isImposter ? "Imposter" : "Crewmate";
  roleTag.classList.toggle("role-imposter", isImposter);
  roleTag.classList.toggle("role-crewmate", !isImposter);
  roleTag.classList.add("role-badge");
  revealView.classList.toggle("imposter-card", isImposter);

  if (isImposter) {
    roleHeadline.textContent = "You are the Imposter";
    const clues = [];
    if (state.showCategoryToImposter) {
      clues.push(`<span class="highlight-clue">Category: ${state.category}</span>`);
    } else {
      clues.push(`<span class="danger-text">❌ Category hidden this round</span>`);
    }

    if (state.showHintToImposter) {
      clues.push(`<span class="highlight-clue">Hint: ${state.hint}</span>`);
    } else {
      clues.push(`<span class="danger-text">❌ Hint not shown this round</span>`);
    }
    clues.push("Blend in and figure out the secret word.");
    roleDetails.innerHTML = clues.map((item) => `<li>${item}</li>`).join("");
  } else {
    roleHeadline.textContent = "You are a Crewmate";
    const details = [
      `<span class="highlight-word">${state.word}</span>`,
      ...(state.showCategoryToCrewmate ? [`<span class="highlight-clue">Category: ${state.category}</span>`] : []),
      ...(state.showHintToCrewmate ? [`<span class="highlight-clue">Hint: ${state.hint}</span>`] : []),
      "Keep this secret. Work together to find the Imposter.",
    ];
    roleDetails.innerHTML = details.map((item) => `<li>${item}</li>`).join("");
  }

  console.log(
    `[Debug] Player ${state.currentPlayer} revealed as ${
      isImposter ? "Imposter" : "Crewmate"
    }`
  );
}

function revealRole() {
  if (!state.roundReady) {
    setMessage("Start a round first.", true);
    console.log("[Debug] Reveal blocked — round has not been started.");
    return;
  }
  toggleViews({ revealed: true });
  renderReveal();
}

function hideRole() {
  if (state.currentPlayer >= state.playerCount) {
    toggleViews({ complete: true });
    updateStatus("Ready to vote");
    if (state.autoPickStarter) {
      pickStartingPlayer();
    }
    console.log("[Debug] All roles viewed. Begin discussion and voting.");
    return;
  }

  state.currentPlayer += 1;
  syncHiddenView();
  toggleViews({ hidden: true });
}

function reshuffleRoles() {
  state.imposterIndex = Math.floor(Math.random() * state.playerCount) + 1;
  state.currentPlayer = 1;
  state.roundReady = true;
  syncHiddenView();
  toggleViews({ hidden: true });
  updateStatus("Round in progress");
  console.log(
    `[Debug] Roles reshuffled — new imposter: ${state.imposterIndex}, word unchanged (${state.word}).`
  );
}

function pickStartingPlayer() {
  const starter = Math.floor(Math.random() * state.playerCount) + 1;
  starterResult.textContent = `Player ${starter} starts the talking this round.`;
  console.log(`[Debug] Starter selected: Player ${starter}`);
}

function attachHandlers() {
  startRoundButton.addEventListener("click", () => startRound());
  revealButton.addEventListener("click", revealRole);
  hideButton.addEventListener("click", hideRole);
  restartRoundButton.addEventListener("click", () => startRound());
  reshuffleRolesButton.addEventListener("click", () => startRound({ reuseWord: true }));
  editSettingsButton.addEventListener("click", showSetupPanel);
  pickStarterButton.addEventListener("click", pickStartingPlayer);
  resetWordsButton.addEventListener("click", () => {
    resetUsedWords(languageSelect.value);
    console.log("[Debug] Manual reset triggered for used words.");
  });
  languageSelect.addEventListener("change", () => {
    state.language = languageSelect.value;
    initCategoryOptions();
    resetUsedWords(state.language, true);
    setMessage("Language switched. Word pool refreshed for this language.", false);
    console.log(`[Debug] Language changed to ${state.language} and word pool refreshed.`);
  });
}

function init() {
  initCategoryOptions();
  attachHandlers();
  updateStatus("Waiting to start");
  syncHiddenView();
}

init();
