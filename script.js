const facts = [
  "Vice City first appeared in the Grand Theft Auto series in 2002.",
  "Grand Theft Auto V follows Michael, Franklin, and Trevor.",
  "Grand Theft Auto VI is set in the fictional state of Leonida.",
  "Lucia and Jason are the central duo introduced in GTA VI's trailers."
];

const factText = document.getElementById("fact-text");
const factButton = document.getElementById("fact-button");

if (factText && factButton) {
  let previousFact = 0;

  factButton.addEventListener("click", function () {
    let nextFact = Math.floor(Math.random() * facts.length);

    if (facts.length > 1 && nextFact === previousFact) {
      nextFact = (nextFact + 1) % facts.length;
    }

    previousFact = nextFact;
    factText.textContent = facts[nextFact];
  });
}

const searchInput = document.getElementById("character-search");
const searchMessage = document.getElementById("search-message");

if (searchInput && searchMessage) {
  const characterCards = document.querySelectorAll(".character-card");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLocaleLowerCase().trim();
    let visibleCount = 0;

    characterCards.forEach(function (card) {
      const characterInfo = card.textContent.toLocaleLowerCase();
      const matches = characterInfo.includes(searchTerm);

      card.hidden = !matches;

      if (matches) {
        visibleCount++;
      }
    });

    if (searchTerm === "") {
      searchMessage.textContent = `Showing all ${visibleCount} characters.`;
    } else {
      searchMessage.textContent =
        visibleCount === 0
          ? "No characters found. Try another name."
          : `Found ${visibleCount} matching character${visibleCount === 1 ? "" : "s"}.`;
    }
  });
}

const themeButton = document.getElementById("theme-button");

if (themeButton) {
  const savedTheme = localStorage.getItem("viceCityTheme");
  const neonEnabled = savedTheme === "neon";

  if (neonEnabled) {
    document.body.classList.add("neon-mode");
  }
  themeButton.setAttribute("aria-pressed", String(neonEnabled));
  themeButton.setAttribute(
    "aria-label",
    neonEnabled ? "Switch to classic color theme" : "Switch to neon color theme"
  );
  themeButton.title = neonEnabled ? "Switch to classic color theme" : "Switch to neon color theme";

  themeButton.addEventListener("click", function () {
    const neonEnabled = document.body.classList.toggle("neon-mode");
    localStorage.setItem("viceCityTheme", neonEnabled ? "neon" : "classic");
    themeButton.setAttribute("aria-pressed", String(neonEnabled));
    themeButton.setAttribute(
      "aria-label",
      neonEnabled ? "Switch to classic color theme" : "Switch to neon color theme"
    );
    themeButton.title = neonEnabled ? "Switch to classic color theme" : "Switch to neon color theme";
  });
}

const shareButtons = document.querySelectorAll("#share-button, #share-button-rail");
let shareStatus = document.getElementById("share-status");

if (shareButtons.length > 0) {
  if (!shareStatus) {
    shareStatus = document.createElement("span");
    shareStatus.className = "visually-hidden";
    shareStatus.id = "share-status";
    shareStatus.setAttribute("role", "status");
    shareStatus.setAttribute("aria-live", "polite");
    document.body.appendChild(shareStatus);
  }

  shareButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const pageTitle = document.title;
      const pageUrl = window.location.href;

      if (navigator.share) {
        navigator.share({ title: pageTitle, url: pageUrl }).catch(function () {
          if (shareStatus) {
            shareStatus.textContent = "Sharing was cancelled. You can copy the page address from your browser.";
          }
        });
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pageUrl).then(function () {
          if (shareStatus) {
            shareStatus.textContent = "Link copied—send it to your crew!";
          }
        }).catch(function () {
          if (shareStatus) {
            shareStatus.textContent = "Copy the page address from your browser to share it.";
          }
        });
        return;
      }

      if (shareStatus) {
        shareStatus.textContent = "Copy the page address from your browser to share it.";
      }
    });
  });
}

const quizQuestion = document.getElementById("quiz-question");
const quizAnswersContainer = document.getElementById("quiz-answers");
const quizFeedback = document.getElementById("quiz-feedback");
const quizScore = document.getElementById("quiz-score");
const highScoreDisplay = document.getElementById("high-score");
const questionProgress = document.getElementById("question-progress");
const quizProgressBar = document.getElementById("quiz-progress-bar");
const nextQuestionButton = document.getElementById("next-question");
const restartQuizButton = document.getElementById("restart-quiz");
const quizShareButton = document.getElementById("share-quiz-result");
const quizShareStatus = document.getElementById("quiz-share-status");

let quizResultText = "";

if (quizShareButton && quizShareStatus) {
  quizShareButton.addEventListener("click", function () {
    const shareData = {
      title: "My Vice City Quiz result",
      text: quizResultText,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).then(function () {
        quizShareStatus.textContent = "Challenge shared!";
      }).catch(function () {
        quizShareStatus.textContent = "Sharing was cancelled. You can copy the page address from your browser.";
      });
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(`${quizResultText} ${window.location.href}`).then(function () {
        quizShareStatus.textContent = "Challenge copied—send it to a friend!";
      }).catch(function () {
        quizShareStatus.textContent = "Copy your result and page address to challenge a friend.";
      });
      return;
    }

    quizShareStatus.textContent = "Copy your result and page address to challenge a friend.";
  });
}

const quizQuestions = [
  {
    question: "Which fictional state is featured in GTA VI?",
    answers: ["San Andreas", "Leonida", "Liberty City"],
    correctAnswer: "Leonida"
  },
  {
    question: "Who is one of GTA VI's central characters?",
    answers: ["Lucia", "Carl", "Niko"],
    correctAnswer: "Lucia"
  },
  {
    question: "Which trio are the protagonists of GTA V?",
    answers: ["Michael, Franklin, and Trevor", "Lucia, Jason, and Niko", "Carl, Tommy, and Michael"],
    correctAnswer: "Michael, Franklin, and Trevor"
  },
  {
    question: "What is the name of GTA V's main city?",
    answers: ["Vice City", "Los Santos", "Liberty City"],
    correctAnswer: "Los Santos"
  },
  {
    question: "Which fictional state is home to Vice City in GTA VI?",
    answers: ["Leonida", "San Andreas", "North Yankton"],
    correctAnswer: "Leonida"
  }
];

if (
  quizQuestion &&
  quizAnswersContainer &&
  quizFeedback &&
  quizScore &&
  highScoreDisplay &&
  questionProgress &&
  quizProgressBar &&
  nextQuestionButton &&
  restartQuizButton
) {
  let currentQuestionIndex = 0;
  let score = 0;
  let answeredCurrentQuestion = false;
  const savedHighScore = Number(localStorage.getItem("viceCityHighScore") || 0);
  let highScore = Number.isFinite(savedHighScore) &&
    savedHighScore >= 0 &&
    savedHighScore <= quizQuestions.length
    ? savedHighScore
    : 0;

  highScoreDisplay.textContent = `Personal best: ${highScore}/${quizQuestions.length}`;
  quizProgressBar.setAttribute("role", "progressbar");
  quizProgressBar.setAttribute("aria-label", "Quiz progress");
  quizProgressBar.setAttribute("aria-valuemin", "0");
  quizProgressBar.setAttribute("aria-valuemax", String(quizQuestions.length));

  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    quizQuestion.textContent = currentQuestion.question;
    questionProgress.textContent = `Question ${questionNumber} of ${quizQuestions.length}`;
    quizProgressBar.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
    quizProgressBar.setAttribute("aria-valuenow", String(currentQuestionIndex));
    quizAnswersContainer.replaceChildren();
    quizFeedback.textContent = "Choose your answer!";
    nextQuestionButton.hidden = true;
    answeredCurrentQuestion = false;

    currentQuestion.answers.forEach(function (answer) {
      const answerButton = document.createElement("button");
      answerButton.classList.add("quiz-answer");
      answerButton.type = "button";
      answerButton.textContent = answer;

      answerButton.addEventListener("click", function () {
        if (answeredCurrentQuestion) return;

        answeredCurrentQuestion = true;
        const answeredCount = currentQuestionIndex + 1;
        quizProgressBar.style.width = `${(answeredCount / quizQuestions.length) * 100}%`;
        quizProgressBar.setAttribute("aria-valuenow", String(answeredCount));
        quizAnswersContainer.querySelectorAll("button").forEach(function (button) {
          button.disabled = true;
        });

        if (answer === currentQuestion.correctAnswer) {
          score++;
          answerButton.classList.add("answer-correct");
          quizFeedback.textContent = "Correct! Nice work!";
        } else {
          answerButton.classList.add("answer-incorrect");
          quizAnswersContainer.querySelectorAll("button").forEach(function (button) {
            if (button.textContent === currentQuestion.correctAnswer) {
              button.classList.add("answer-correct");
            }
          });
          quizFeedback.textContent = `Not quite! The correct answer is ${currentQuestion.correctAnswer}.`;
        }

        quizScore.textContent = `Score: ${score}`;

        if (score > highScore) {
          highScore = score;
          localStorage.setItem("viceCityHighScore", String(highScore));
          highScoreDisplay.textContent = `Personal best: ${highScore}/${quizQuestions.length}`;
        }

        nextQuestionButton.hidden = false;
        nextQuestionButton.focus();
      });

      quizAnswersContainer.appendChild(answerButton);
    });
  }

  nextQuestionButton.addEventListener("click", function () {
    if (!answeredCurrentQuestion) return;

    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
      quizAnswersContainer.querySelector("button")?.focus();
      return;
    }

    const percentage = Math.round((score / quizQuestions.length) * 100);
    const rank = percentage === 100
      ? "Vice City Legend"
      : percentage >= 60
        ? "Street Smart"
        : "Rookie";

    quizQuestion.textContent = "Quiz complete!";
    questionProgress.textContent = `Final score: ${score} out of ${quizQuestions.length}`;
    quizAnswersContainer.replaceChildren();
    nextQuestionButton.hidden = true;
    quizProgressBar.style.width = "100%";
    quizProgressBar.setAttribute("aria-valuenow", String(quizQuestions.length));
    quizFeedback.textContent = `Rank: ${rank} — ${percentage}%. Play again and beat your best!`;
    quizScore.textContent = `Final score: ${score}/${quizQuestions.length}`;
    quizResultText = `I scored ${score}/${quizQuestions.length} (${rank}) on the Vice City Central GTA quiz. Can you beat me?`;
    if (quizShareButton) {
      quizShareButton.hidden = false;
    }
    restartQuizButton.focus();
  });

  restartQuizButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;
    quizResultText = "";
    if (quizShareButton) {
      quizShareButton.hidden = true;
    }
    if (quizShareStatus) {
      quizShareStatus.textContent = "";
    }
    quizScore.textContent = "Score: 0";
    displayQuestion();
    quizAnswersContainer.querySelector("button")?.focus();
  });

  displayQuestion();
}

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
  window.addEventListener("scroll", function () {
    backToTopButton.classList.toggle("visible", window.scrollY > 300);
  }, { passive: true });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
