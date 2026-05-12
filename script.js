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

let Countries = [];
let Guessed = {};
fetch("world.svg")
    .then(Response => Response.text())
    .then(Data => {

        document.getElementById("MapContainer").innerHTML = Data;

    });
fetch("Countries.json")
.then(Response => Response.json())
.then(Data => {
    Countries = Data;

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
}
function HighlightCountry(Name) {
    const Country = document.getElementById(Name);

    if (Country) {
        Country.style.fill = "#27F598";
    }
    else {
     }

    
}

function GuessedCountry(Name) {

    let Alr = false;

    const Message = document.getElementById("Message");

    if (!(Name in Guessed)) {
        Guessed[Name] = true;

        Message.innerText = `Correct!`;
        Message.style.color = "#27F598";
        HighlightCountry(Name)
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
    const InputBox = document.getElementById("Input");
    const Result = Input(InputBox.value);
    if (Result == "Correct") {
        InputBox.value = "";
    }
});

function WaitForValue() {
    const InputBox = document.getElementById("Input");

    Input(InputBox.value);

    InputBox.value = "";
}

function UpdateProgress() {
    document.getElementById("Progress").innerText =
        `${Object.keys(Guessed).length} / ${Countries.length}`;
}
