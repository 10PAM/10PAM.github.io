var previous_ID = null;
var previous_ID_Project = null;

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

// Handle Blog Buttons
function myFunctionBlog(typ3) {
    if (typ3 === "Top") {
        window.scrollTo(0, 0);
    } else {
        document.getElementById("Blog").style.display = "none";
        window.scrollTo(0, 0);
    }
}



