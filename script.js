const All = {
    "uk": "unitedkingdom",
    "czechia": "czechrepublic",
    "car": "centralafricanrepublic",
    "us": "unitedstates",
    "afganistan": "afghanistan",
    "kazakstan": "kazakhstan",
    "kyrgikstan": "kyrgykstan",
};

let Countries = [];
let Guessed = {};

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

function GuessedCountry(Name) {
    const Message = document.getElementById("Message");

    if (!(Name in Guessed)) {
        Guessed[Name] = true;

        Message.innerText = `Correct!`;
        Message.style.color = "lime";
    } else {
        Message.innerText = "Already guessed.";
        Message.style.color = "yellow";
    }

    UpdateProgress();
}

function Input(Text) {
    const Filtered = [...Text]
        .filter(Char => /[a-zA-Z]/.test(Char))
        .join("");

    const Final = Filtered.toLowerCase();

    const Country = IsACountry(Final);

    const Message = document.getElementById("Message");

    if (Country) {
        GuessedCountry(Final);
    } else {
        Message.innerText = "Wrong.";
        Message.style.color = "red";
    }
}

function WaitForValue() {
    const InputBox = document.getElementById("Input");

    Input(InputBox.value);

    InputBox.value = "";
}

function UpdateProgress() {
    document.getElementById("Progress").innerText =
        `${Object.keys(Guessed).length} / ${Countries.length}`;
}