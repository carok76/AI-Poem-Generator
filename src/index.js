function displayInitialPoem() {
    let typewriter = new Typewriter(poemContainer, {
        loop: false,
        delay: 50,
        autoStart: true,
    });

    typewriter
        .typeString("Words dance in my mind")
        .pauseFor(200)
        .typeString("<br />Crafting verses with AI")
        .pauseFor(200)
        .typeString("<br />Join me, write your verse")
        .start();
}

function generatePoem(event) {
    event.preventDefault();

    let promptInput = document.querySelector("#prompt-input");

    let apiKey = "o922906b22974ec99e9bc3858a42ft20";
    let context = "You are a creative and poetic poem expert and love to write Haikus. The Haiku has to have three sentences with five syllables in the first line, seven in the second line and five in the third line. The Haiku must be provided in basic HTML format. Example: <p>this is a haiku</p>. Seperate each line with a <br />. Don't add a <br /> after the last line. Stick to three lines. Make sure to follow the user instructions."
    let prompt = `User instructions are: Generate a Haiku poem about ${promptInput.value}.`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    console.log("Generating Poem");
    console.log(`${context}`);
    console.log(`${prompt}`);

    axios.get(apiUrl).then(displayPoem).catch((error) => {
        console.error("Error generating poem:", error);
        poemContainer.innerHTML = "<p>Sorry, something went wrong. Please try again.</p>";
    });;
}

function displayPoem(response) {
    if (response.data && response.data.answer) {
        let cleanedAnswer = response.data.answer.trim();
        cleanedAnswer = cleanedAnswer.replace(/(<br\s*\/?>\s*)+$/, "");

        let typewriter = new Typewriter(poemContainer, {
            loop: false,
            delay: 50,
            autoStart: true,
        });

        typewriter.typeString(cleanedAnswer).start();
    } else {
        console.error("No valid poem in response:", response);
        poemContainer.innerHTML = "<p>Sorry, no poem was generated. Please try again.</p>";
    }
}

let poemContainer = document.querySelector("#poem");

displayInitialPoem();

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);

