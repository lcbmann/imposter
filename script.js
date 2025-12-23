const categorySelect = document.getElementById("categorySelect");
const playerCountInput = document.getElementById("playerCount");
const categoryToggle = document.getElementById("categoryToggle");
const hintToggle = document.getElementById("hintToggle");
const crewCategoryToggle = document.getElementById("crewCategoryToggle");
const crewHintToggle = document.getElementById("crewHintToggle");
const autoStarterToggle = document.getElementById("autoStarterToggle");
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
    { word: "Pizza", hint: "Weekend takeout classic" },
    { word: "Sushi", hint: "Seaweed roll night out" },
    { word: "Taco", hint: "Tuesday favorite fold" },
    { word: "Pancakes", hint: "Fluffy stack at brunch" },
    { word: "Guacamole", hint: "Green dip with chips" },
    { word: "Burger", hint: "Backyard grill staple" },
    { word: "Spaghetti", hint: "Twirl it with a fork" },
    { word: "Salad", hint: "Crunchy bowl of greens" },
    { word: "Donut", hint: "Morning coffee partner" },
    { word: "Soup", hint: "Comfort in a bowl" },
    { word: "Sandwich", hint: "Lunch between two slices" },
    { word: "Fries", hint: "Side order with ketchup" },
    { word: "Apple", hint: "Crunchy lunchbox fruit" },
    { word: "Chocolate", hint: "Sweet bar for dessert" },
    { word: "Cheese", hint: "Pairs with crackers" },
    { word: "Burrito", hint: "Everything wrapped tight" },
    { word: "Ice Cream", hint: "Scoops on a summer day" },
    { word: "Steak", hint: "Cast-iron date night" },
    { word: "Noodles", hint: "Slurped with broth" },
    { word: "Hot Dog", hint: "Stadium snack in a bun" },
  ],
  Animals: [
    { word: "Elephant", hint: "Safari giant with big ears" },
    { word: "Penguin", hint: "Waddles on ice" },
    { word: "Kangaroo", hint: "Hops with a built-in pouch" },
    { word: "Giraffe", hint: "Spots and towering neck" },
    { word: "Dolphin", hint: "Ocean buddy that clicks" },
    { word: "Panda", hint: "Bamboo snacker in black and white" },
    { word: "Owl", hint: "Wide eyes in the moonlight" },
    { word: "Zebra", hint: "Striped runner on the plains" },
    { word: "Otter", hint: "River slick and playful" },
    { word: "Fox", hint: "Clever red tail in the woods" },
    { word: "Cat", hint: "Window perch napper" },
    { word: "Dog", hint: "Fetch-loving friend" },
    { word: "Rabbit", hint: "Garden visitor with hops" },
    { word: "Turtle", hint: "Slow and shelled" },
    { word: "Bear", hint: "Forest sleeper that loves berries" },
    { word: "Whale", hint: "Ocean giant with songs" },
    { word: "Parrot", hint: "Colorful chatterbox" },
    { word: "Horse", hint: "Stables and saddles" },
    { word: "Lion", hint: "Savannah roar" },
    { word: "Sheep", hint: "Fuzzy cloud in a field" },
  ],
  Travel: [
    { word: "Passport", hint: "Stamps from borders" },
    { word: "Suitcase", hint: "Wheels through terminals" },
    { word: "Compass", hint: "Needle that settles" },
    { word: "Hostel", hint: "Shared bunks on a budget" },
    { word: "Ticket", hint: "Boarding pass cousin" },
    { word: "Map", hint: "Folded paper guide" },
    { word: "Train", hint: "All aboard the platform" },
    { word: "Airport", hint: "Gates, lounges, delays" },
    { word: "Taxi", hint: "Meter running in traffic" },
    { word: "Backpack", hint: "Carry-on with straps" },
    { word: "Hotel", hint: "Keycard hallway" },
    { word: "Beach", hint: "Towel in the sand" },
    { word: "Cruise", hint: "Buffet on the ocean" },
    { word: "Bus", hint: "City route with stops" },
    { word: "Guidebook", hint: "Dog-eared travel tips" },
    { word: "Postcard", hint: "Hello from far away" },
    { word: "Ferry", hint: "Cars loaded onto a boat" },
    { word: "Mountain", hint: "Trail up to a view" },
    { word: "Sunscreen", hint: "Prevents souvenir sunburn" },
    { word: "Pillow", hint: "Neck saver on a red-eye" },
  ],
  Sports: [
    { word: "Basketball", hint: "Net swish on hardwood" },
    { word: "Tennis", hint: "Serve down the line" },
    { word: "Soccer", hint: "Goal under the crossbar" },
    { word: "Hockey", hint: "Skates and a chilly rink" },
    { word: "Volleyball", hint: "Set at the net" },
    { word: "Baseball", hint: "Home plate slide" },
    { word: "Golf", hint: "Quiet swing on the green" },
    { word: "Bowling", hint: "Strike down the lane" },
    { word: "Cycling", hint: "Peloton on the road" },
    { word: "Running", hint: "Finish line sprint" },
    { word: "Swimming", hint: "Laps with goggles" },
    { word: "Skateboard", hint: "Kickflip at the park" },
    { word: "Yoga", hint: "Hold the pose and breathe" },
    { word: "Surfing", hint: "Catch a clean break" },
    { word: "Table Tennis", hint: "Spin on a tiny table" },
    { word: "Badminton", hint: "Feathered birdie rallies" },
    { word: "Rugby", hint: "Scrum for the try" },
    { word: "Boxing", hint: "Bell between rounds" },
    { word: "Skiing", hint: "Carve fresh powder" },
    { word: "Jump Rope", hint: "Double-unders and rhythm" },
  ],
  Movies: [
    { word: "Star Wars", hint: "Twin suns and space duels" },
    { word: "Harry Potter", hint: "Owls, wands, and houses" },
    { word: "Marvel", hint: "Caped team-up universe" },
    { word: "Frozen", hint: "Let it go in the snow" },
    { word: "Jurassic Park", hint: "Theme park with roars" },
    { word: "The Godfather", hint: "Offer you can't refuse" },
    { word: "Toy Story", hint: "Toys that talk when alone" },
    { word: "Batman", hint: "Gotham’s masked knight" },
    { word: "James Bond", hint: "Agent with gadgets" },
    { word: "Shrek", hint: "Ogre in a swamp" },
    { word: "Spider-Man", hint: "Friendly neighborhood" },
    { word: "Finding Nemo", hint: "Clownfish on a journey" },
    { word: "Pirates of the Caribbean", hint: "Compass that doesn’t point north" },
    { word: "The Matrix", hint: "Red pill decision" },
    { word: "Lord of the Rings", hint: "A journey to Mount Doom" },
    { word: "Rocky", hint: "Steps and a boxing montage" },
    { word: "Inception", hint: "Dream within a dream" },
    { word: "Back to the Future", hint: "88 mph to time jump" },
    { word: "Ghostbusters", hint: "Who you gonna call?" },
    { word: "Black Panther", hint: "Wakanda forever" },
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
  showCategoryToCrewmate: false,
  showHintToCrewmate: false,
  autoPickStarter: false,
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
  state.showCategoryToCrewmate = crewCategoryToggle.checked;
  state.showHintToCrewmate = crewHintToggle.checked;
  state.autoPickStarter = autoStarterToggle.checked;
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
    `[Debug] New round started — players: ${playerCount}, imposter: ${state.imposterIndex}, category: ${state.category}, word: ${state.word}, categoryClue: ${state.showCategoryToImposter}, hintClue: ${state.showHintToImposter}, crewCategory: ${state.showCategoryToCrewmate}, crewHint: ${state.showHintToCrewmate}, autoStarter: ${state.autoPickStarter}`
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
}

function init() {
  initCategoryOptions();
  attachHandlers();
  updateStatus("Waiting to start");
  syncHiddenView();
}

init();
