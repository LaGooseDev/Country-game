const All = {
    "uk": "unitedkingdom",
    "czechia": "czechrepublic",
    "car": "centralafricanrepublic",
    "us": "unitedstates",
    "afganistan": "afghanistan",
    "kazakstan": "kazakhstan",
    "kyrgikstan": "kyrgykstan",
    "bosnia": "bosniaandherzegovina"
};

const DefTimer = 15 * 60;

let TimeLeft = DefTimer;
let Countries = [];
let Guessed = {};

let GameRunning = true

fetch("world.svg")
    .then(Response => Response.text())
    .then(Data => {

        document.getElementById("MapContainer").innerHTML = Data;

    });
fetch("Countries.json")
.then(Response => Response.json())
.then(Data => {
    Countries = Data;

    console.log("Countries loaded:");
    console.log(Countries);

    UpdateProgress();
});
function IsACountry(Text) {
    let From = null;

    if (Countries.includes(Text)) {
        From = Text;
    } else {
        From = All[Text];
    }

    return From;
};
function HighlightCountry(Name, Color) {

    if (!Color) {
        Color = "#4C7965"
    }

    const Country = document.getElementById(Name);

    if (Country) {
        Country.style.fill = Color;
    }
    else {
     }

    
};

function GuessedCountry(Name) {

    let Alr = false;

    const Message = document.getElementById("Message");

    if (!(Name in Guessed)) {
        Guessed[Name] = true;

        Message.innerText = `Correct!`;
        Message.style.color = "#27F598";
        HighlightCountry(Name,"#4C7965")
    } else {
        Message.innerText = "Already guessed.";
        Message.style.color = "yellow";
        Alr = true;
    }

    UpdateProgress();

    return Alr
}

function Input(Text) {

    let Result = "Fail"

    const Filtered = [...Text]
        .filter(Char => /[a-zA-Z]/.test(Char))
        .join("");

    const Final = Filtered.toLowerCase();

    const Country = IsACountry(Final);

    const Message = document.getElementById("Message");

    if (Country) {
        const Alr = GuessedCountry(Country);
        if (Alr == false) {
            Result = "Correct";
        };
    } else {
        Message.innerText = "Wrong.";
        Message.style.color = "red";
    };

    return Result
}
const InputBox = document.getElementById("Input");

InputBox.addEventListener("input", function () {
    if (!GameRunning) {
        return
    }
    const InputBox = document.getElementById("Input");
    const Result = Input(InputBox.value);
    if (Result == "Correct") {
        InputBox.value = "";
    }
});

function WaitForValue() {
    if (!GameRunning) {
        return
    }
    const InputBox = document.getElementById("Input");

    Input(InputBox.value);

    InputBox.value = "";
}

function UpdateProgress() {
    console.log("UpdateProgress running");
    console.log(Countries);

    for (const [i, v] of Countries.entries()) {
//        HighlightCountry(v, "#D4CD13");
    }
    document.getElementById("Progress").innerText =
        `${Object.keys(Guessed).length} / ${Countries.length}`;
}

function ToggleElements(Names, to) {
    let An = "hidden"
    if (to == true) {
        An = "visible"
    }
    for (const [i, v] of Names.entries()) {
        document.getElementById(v).style.visibility = An;
    }
}
ToggleElements([
    "Restart",
], false)

function Restart() {
    for (const [i, v] of Countries.entries()) {
        HighlightCountry(v, "#ffffff");
    }
    Guessed = {}
    ToggleElements([
        "Input",
        "GuessButton",
        "Message"
    ], true)
    ToggleElements([
        "Restart",
    ], false)
    GameRunning = true
    TimeLeft = DefTimer
    StartTimer()
    UpdateProgress()
}

function EndGame() {
    GameRunning = false
    ToggleElements([
        "Input",
        "GuessButton",
        "Message"
    ], false)
    ToggleElements([
        "Restart",
    ], true)
}


const TimerElement = document.getElementById("Timer");

function StartTimer() {
    function UpdateTimer() {
    let Minutes = Math.floor(TimeLeft / 60);
    let Seconds = TimeLeft % 60;

    TimerElement.innerText = `${Minutes}:${Seconds.toString().padStart(2, "0")}`;

    if (TimeLeft <= 0) {
        clearInterval(TimerInterval);
        TimerElement.innerText = "Time's up!";
        EndGame();
    }
    else {
        if (TimeLeft <= 10) {
             TimerElement.style.color = "red";
        }
        else{
            TimerElement.style.color = "white";
        }
    }

    TimeLeft--;
}

const TimerInterval = setInterval(UpdateTimer, 1000);

UpdateTimer();
}

StartTimer()