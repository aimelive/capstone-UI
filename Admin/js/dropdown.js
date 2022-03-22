function showHidden() {
    document.getElementById("dropDownList").style.display = "block";
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
}