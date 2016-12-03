var paragraphArray = [];
paragraphArray.push(["It's really a wonder that I haven't dropped all my ideals, because they seem so absurd and impossible to carry out. Yet I keep them, because in spite of everything, I still believe that people are really good at heart.", "Anne Frank"]);
paragraphArray.push(["They say a person needs just three things to be truly happy in this world: someone to love, something to do, and something to hope for.", "Tom Bodett"]);
paragraphArray.push(["If you don't know the guy on the other side of the world, love him anyway because he's just like you. He has the same dreams, the same hopes and fears. It's one world, pal. We're all neighbors.", "Frank Sinatra"]);
paragraphArray.push(["I look forward to a great future for America - a future in which our country will match its military strength with our moral restraint, its wealth with our wisdom, its power with our purpose.", "John F. Kennedy"]);
paragraphArray.push(["There is no hunting like the hunting of man, and those who have hunted armed men long enough and liked it, never care for anything else thereafter.", "Ernest Hemingway"]);
paragraphArray.push(["Music is a moral law. It gives soul to the universe, wings to the mind, flight to the imagination, and charm and gaiety to life and to everything.", "Plato"]);
paragraphArray.push(["It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all, in which case you have failed by default.", "J. K. Rowling"]);
paragraphArray.push(["There is a real danger that computers will develop intelligence and take over. We urgently need to develop direct connections to the brain so that computers can add to human intelligence rather than be in opposition.", "Stephen Hawking"]);

var paragraphSection = document.getElementById("paragraph");
var inputBox = document.getElementById("inputBox");
var wordCount = 1;
var timerStarted = false;
var t;
var seconds = 0;
var wpmElement = document.getElementById("wpm");
var reset = document.getElementById("reset");
var errors = 0;
var author = document.getElementById("author");
var historyEl = document.getElementById("history");
var historyTitle = document.getElementById("historyTitle");

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

/*var wpmHistory = [];
var d = new Date();
wpmHistory.push([26, d]);
var jsonHistory = JSON.stringify(wpmHistory);
localStorage.setItem("wpmHistory", jsonHistory);*/

function setup() {
  paragraphSection.innerHTML = "";
  wordCount = 1;
  timerStarted = false;
  seconds = 0;
  errors = 0;
  var paragraphSelection = paragraphArray[Math.floor(Math.random()*paragraphArray.length)];
  paragraph = paragraphSelection[0];
  author.innerHTML = "- " + paragraphSelection[1];
  for (var i = 0; i < paragraph.length; i++) {
    var newLetter = document.createElement("span");
    newLetter.setAttribute("data-character", paragraph[i]);
    newLetter.setAttribute("data-position", i);
    if (i === 0) {
      newLetter.setAttribute("id", "next");
    }
    if (paragraph[i] === " ") {
      newLetter.setAttribute("class", "space");
    }
    paragraphSection.appendChild(newLetter);
    if (paragraph[i] === " ") {
      newLetter.innerHTML = "␣";
      wordCount++;
    } else {
      newLetter.innerHTML = paragraph[i];
    }
  }
}



reset.addEventListener("click", function() {
  wpmElement.innerHTML = "";
  setup();
});

inputBox.addEventListener("blur", function() {
  inputBox.focus();
});

window.onload = function() {
  setup();
  inputBox.focus();
  getHistory();
};

inputBox.addEventListener("input", function() {
  var letter = document.getElementById("next");
  letterValue = letter.getAttribute("data-character");
  if (inputBox.value === letterValue) {
    if (letter.nextSibling === null) {
      letter.id = "";
      inputBox.value = "";
      stopTimer();
    } else {
      if (!timerStarted) {
        startTimer();
      }
      var nextLetter = letter.nextSibling;
      nextLetter.id = "next";
      inputBox.value = "";
      letter.id = "";
    }
  } else {
    letter.setAttribute("data-wrong", "yes");
    inputBox.value = "";
    errors++;
  }
});

function getHistory() {
  historyEl.innerHTML = "";
  var jsonHistory = localStorage.getItem("wpmHistory");
  var wpmHistory = JSON.parse(jsonHistory);
  if (wpmHistory.length > 0) {
    historyTitle.style.display = "block";
  }
  for (var i = 0; i < wpmHistory.length; i++) {
    historyEl.innerHTML += "<span>" + wpmHistory[i][0] + " WPM on " + wpmHistory[i][1] + "</span>";
  }
}

function stopTimer() {
   clearTimeout(t);
   minutes = seconds / 60;
   wordsPerMinute = Math.round(wordCount / minutes);
   wpm.innerHTML = "You typed at " +  wordsPerMinute + " words per minute with " + errors + " errors!";
   reset.style.display = "block";
   var jsonHistory = localStorage.getItem("wpmHistory");
   var wpmHistory = JSON.parse(jsonHistory);
   var d = new Date();
   wpmHistory.push ([wordsPerMinute, d]);
   jsonHistory = JSON.stringify(wpmHistory);
   localStorage.setItem("wpmHistory", jsonHistory);
   getHistory();
}

function startTimer() {
  timerStarted = true;
  t = setTimeout(add, 1000);
}

function add() {
  seconds++;
  startTimer();
}
