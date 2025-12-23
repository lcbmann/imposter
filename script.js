const categorySelect = document.getElementById("categorySelect");
const playerCountInput = document.getElementById("playerCount");
const categoryToggle = document.getElementById("categoryToggle");
const hintToggle = document.getElementById("hintToggle");
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
    { word: "Soccer", hint: "World’s most popular game" },
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
};

function initCategoryOptions() {
  const fragment = document.createDocumentFragment();
  const randomOption = document.createElement("option");
  randomOption.value = "random";
  randomOption.textContent = "Random category";
  fragment.appendChild(randomOption);

  Object.keys(WORD_BANK).forEach((category) => {
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
    return randomItem(Object.keys(WORD_BANK));
  }
  return choice;
}

function pickWord(category) {
  const entry = randomItem(WORD_BANK[category]);
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
  state.showCategoryToImposter = categoryToggle.checked;
  state.showHintToImposter = hintToggle.checked;
  state.roundReady = true;
  state.imposterIndex = Math.floor(Math.random() * playerCount) + 1;

  if (!reuseWord) {
    const category = pickCategory();
    const selection = pickWord(category);
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
    `[Debug] New round started — players: ${playerCount}, imposter: ${state.imposterIndex}, category: ${state.category}, word: ${state.word}, categoryClue: ${state.showCategoryToImposter}, hintClue: ${state.showHintToImposter}`
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
}

function init() {
  initCategoryOptions();
  attachHandlers();
  updateStatus("Waiting to start");
  syncHiddenView();
}

init();
