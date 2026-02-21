var previous_ID = null;
var previous_ID_Project = null;

// Insert Subpages
function innerPage(pageName) {
    // Check Page; Insert HTML data if page exists
    if (document.getElementById(pageName+"_DIV") !== null) {
        let careerTextArea = document.getElementById(pageName+"_DIV");
        let innerText = "";
        fetch("/Pages/" + pageName + ".html")
        .then(response => response.text())
        .then(html => {
            careerTextArea.innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading page:", error);
        });
    }
}

//Handle Menu Buttons' Inputs 
function myFunction(typ3) {
    if (previous_ID !== null && typ3 !== previous_ID)
    {
        var x_previous = document.getElementById(previous_ID);
        x_previous.style.display = "none";
    }

    //Hide Previous visible project if not null
    if (previous_ID_Project !== null && typ3 !== previous_ID_Project)
    {
        var proj_previous = document.getElementById(previous_ID_Project);
        proj_previous.style.display = "none";
    }

    var x = document.getElementById(typ3);
    previous_ID = typ3;

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

  //Handle Project Buttons' Inputs
  function myFunctionProject(typ3) {
    if (previous_ID_Project !== null && typ3 !== previous_ID_Project)
    {
        var x_previous = document.getElementById(previous_ID_Project);
        x_previous.style.display = "none";
    }
    
    var x = document.getElementById(typ3);
    previous_ID_Project = typ3;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// Handle GoTo Top and Close Buttons
function myFunctionTopClose(typ3) {
    if (typ3 === "Top") {
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
        document.getElementById(typ3).style.display = "none";
    }
}

// Run Functions
innerPage("Calendar");



