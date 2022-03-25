function showHidden() {
    document.getElementById("dropDownList").style.display = "block";
}

function openSideNav() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("sidebar").style.top = "-25px";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.styledImage')) {
        var dropdowns = document.getElementsByClassName("dropDown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display == "block") {
                openDropdown.style.display = "none";
            }
        }
    }
    if (!event.target.matches('.humberg')) {
        var sidebars = document.getElementsByClassName("sidebar");
        var i;
        for (i = 0; i < sidebars.length; i++) {
            var abc = sidebars[i];
            if (abc.style.display == "block") {
                abc.style.display = "none";
            }
        }
    }
}