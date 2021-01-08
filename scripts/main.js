const form = document.getElementById("form");
const inputs = document.querySelectorAll("input");
const resultsSection = document.getElementById("results-section");

form.onsubmit = function() {
    //receive answers in an array
    var formAnswers = [];
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            formAnswers.push(inputs[i].value);
        }
    }

    //load data.JSON file
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", "data.json");
    ourRequest.onload = function() {
        var JSONdata = JSON.parse(ourRequest.responseText);
        renderHTML(JSONdata);
        window.location.href="#results-section"
    };
    ourRequest.send();

    //function to create and display the self-assessment based on answers from user
    function renderHTML(data) {
        resultsSection.innerHTML = `
            <h4 class="results-heading">Self-Assessment Results:</h4>

            <p class="medical-disclaimer">DISCLAIMER: This tool does not provide medical advice. It is Intended for informational purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen. Never disregard professional medical adivice because of something you have read on this site.</p>

            <p class="results-paragraph">When treating back pain, it is very important to first identify which motions, postures, and loads cause pain in your back - these are called "pain triggers". The next step is to remove these pain triggers from your daily routine and substitute them with healthy, pain-free movement patterns. Doing so reduces stress on the spine and allows the body to heal damaged tissue. Lastly, take steps to broaden and enhance your pain-free movements. The approach just described is commonly known as the "McGill Method". This self-assessment will get you started by describing <b>potential</b> causes of your back pain & pain triggers, methods of relief, and things to do and avoid. However, given how complex back pain can be, always consult with a competent physician for a proper diagnosis.</p>
        `
        //loop through formAnswers and see which questions were answered "yes" & display respective results
        for (j = 0; j < formAnswers.length; j++) {
            if (formAnswers[j] === "true") {
                resultsSection.innerHTML += `
                <p class="results-paragraph">${data[j].problem} ${data[j].cause} ${data[j].relief} ${data[j].do} ${data[j].avoid}</p>
                `
            }
        }

        //if "no" was answered for every question"
        if (formAnswers.includes("true") === false) {
            resultsSection.innerHTML = `<h4 class="results-heading">Congrats! You are pain free :)</h4>`
        }

        resultsSection.style.display = "block";
    }

    //prevent page from reloading
    return false
}

//remove results when reset button is selected
document.querySelector(".btn2").addEventListener("click", ()=> {
    resultsSection.style.display = "none";
    resultsSection.innerHTML = ``
})







