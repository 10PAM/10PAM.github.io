var previous_ID = null;
function myFunction(typ3) {
    if (previous_ID !== null && typ3 !== previous_ID)
    {
        var x_previous = document.getElementById(previous_ID);
        x_previous.style.display = "none";
    }

    var x = document.getElementById(typ3);
    previous_ID = typ3;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }