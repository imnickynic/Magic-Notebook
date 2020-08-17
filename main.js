// create variable for localStorage
let textTitleObj;
let textNoteObj;
let textDateObj;

// fetch data from local storage if available
textTitleObj = localStorage.getItem("textTitleObj");
if (textTitleObj == null) {
    textTitleObj = [];
    textNoteObj = [];
    textDateObj = [];
}
else {
    textTitleObj = JSON.parse(textTitleObj);
    textNoteObj = JSON.parse(localStorage.getItem("textNoteObj"));
    textDateObj = JSON.parse(localStorage.getItem("textDateObj"));

    for (let i = 0; i < textTitleObj.length; i++) {
        displayCard(textTitleObj[i], textNoteObj[i], textDateObj[i], i);
    }
}


// event listener for addNote button
document.getElementById("addNote").addEventListener("click", function () {
    let textNote = document.getElementById("textNote").value;
    let textTitle = document.getElementById("textTitle").value;
    let cardDate = new Date();               //create date for card
    cardDate = cardDate.getDate() + "-" + (cardDate.getMonth() + 1) + "-" + cardDate.getFullYear() + "    (" + (cardDate.getHours()) + ":" + (cardDate.getMinutes()) + ":" + cardDate.getSeconds() + ")";

    if (textNote != "" && textTitle != "") {
        textTitleObj.push(textTitle);
        textNoteObj.push(textNote);
        textDateObj.push(cardDate);
        localStorage.setItem("textTitleObj", JSON.stringify(textTitleObj));
        localStorage.setItem("textNoteObj", JSON.stringify(textNoteObj));
        localStorage.setItem("textDateObj", JSON.stringify(textDateObj));
        displayCard(textTitle, textNote, cardDate, textTitleObj.length);

        document.getElementById("textNote").value = null;
        document.getElementById("textTitle").value = null;

    }
    else {
        alert("Missing 'Note Title' Or 'Your Note'.");
    }
});

//function for edit the title of card
function editTitle(index) {
    index = index[0];
    let newNote = prompt("Enter New Note Title :");
    if (newNote != "" && newNote != null) {
        document.getElementById(index).getElementsByTagName("h5")[0].innerText = newNote;
        textTitleObj = JSON.parse(localStorage.getItem("textTitleObj"));
        textTitleObj[index] = newNote;
        localStorage.setItem("textTitleObj", JSON.stringify(textTitleObj));
    }
    else {
        alert("Title Not Changed.");
    }
}

// function for delete the card
function deleteCard(index) {

    index = index[0];
    textTitleObj = JSON.parse(localStorage.getItem("textTitleObj"));
    textNoteObj = JSON.parse(localStorage.getItem("textNoteObj"));
    textDateObj = JSON.parse(localStorage.getItem("textDateObj"));
    textTitleObj.splice(index, 1);
    textNoteObj.splice(index, 1);
    textDateObj.splice(index, 1);
    if (textTitleObj.length != 0) {
        localStorage.setItem("textTitleObj", JSON.stringify(textTitleObj));
        localStorage.setItem("textNoteObj", JSON.stringify(textNoteObj));
        localStorage.setItem("textDateObj", JSON.stringify(textDateObj));

        document.getElementById("cardContainer").innerText = "";
        for (let i = 0; i < textTitleObj.length; i++) {
            displayCard(textTitleObj[i], textNoteObj[i], textDateObj[i], i);
        }
    }
    else {
        document.getElementById("cardContainer").innerText = "";
        localStorage.clear();
    }
}

//search the card by textNote and textTitle
document.getElementById("searchNote").addEventListener("input", function () {
    let tempText = document.getElementById("searchNote").value.toLowerCase();
    Array.from(document.getElementsByClassName("searchClass")).forEach(function (element) {
        temp1 = element.getElementsByTagName("h5")[0].innerText.toLocaleLowerCase();
        temp2 = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (temp1.includes(tempText) || temp2.includes(tempText)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});


// function for display the card by passing textTitle, textNote, date, index
function displayCard(textTitle, textNote, cardDate, index) {
    cardContainer = document.getElementById("cardContainer");
    cardHtml = document.createElement("div");                //card-div
    cardHtml.className = "card mx-4 my-3 searchClass";
    cardHtml.id = index;                                      //set card id
    cardHtml.setAttribute('style', "width: 18rem;");
    element0 = document.createElement("div");               //card-body
    element0.className = "card-body";
    element1 = document.createElement("h5");                //card-title
    element1.className = "card-title";
    element1.setAttribute("style", "text-transform: capitalize;");
    element1.innerText = textTitle;
    element2 = document.createElement("h6");                 //card-date
    element2.className = "card-subtitle mb-1 text-muted";
    element2i = document.createElement("i");
    element2i.setAttribute("style", "font-size:14px;")
    element2i.innerText = cardDate;
    element2.appendChild(element2i);
    element3 = document.createElement("p");                     //card-note
    element3.className = "card-text my-3";
    element3.setAttribute("style", "text-transform: capitalize;");
    element3.innerText = textNote;
    element4 = document.createElement("a");                 //card-edit-link
    element4.className = "card-link";
    element4.id = index + "editLink"                         //card-edit-link-id
    element4.setAttribute("style", "cursor:pointer;",);
    element4.setAttribute("onclick", "editTitle(this.id)");
    element4.innerText = "Edit Title";
    element5 = document.createElement("a");               //card-delete-link
    element5.className = "card-link";
    element5.id = index + "deleteLink"                    //card-delete-link-id
    element5.setAttribute("style", "cursor:pointer;");
    element5.setAttribute("onclick", "deleteCard(this.id)");
    element5.innerText = "Delete Note";
    element0.appendChild(element1);
    element0.appendChild(element2);
    element0.appendChild(element3);
    element0.appendChild(element4);
    element0.appendChild(element5);
    cardHtml.appendChild(element0);
    cardContainer.appendChild(cardHtml);

    /*
    //this is original card
    <div class="card mx-4 my-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" ></h5>
            <h6 class="card-subtitle mb-2 text-muted">
                <i></i>
            </h6>
            <p class="card-text"></p>
            <a href="#" class="card-link">Edit Note</a>
            <a href="#" class="card-link">Delete Note</a>
        </div>
    </div>
    */
}

