// Author: Mario Aguilera Piceno
// File: Buttons.js
// Date: 02/20/2023
// Last Modified: 02/20/2026 

// Attributes
var previous_ID = null;
var previous_ID_Project = null;

//Handle Menu Buttons' Inputs 
function myFunction(typ3) {

    // Hide Previous Open Menus
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

    // Obtain Desired Menu
    var x = document.getElementById(typ3);
    previous_ID = typ3;

    // Open or Close Desired Menu
    if (x.style.display === "none") {
        x.style.display = "block";
    } else if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
  }
