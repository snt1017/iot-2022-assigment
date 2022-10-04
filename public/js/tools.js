let searchBar = function (searchBarId, nextPage, errorId = null) {
    let searchBar = document.getElementById(searchBarId);
    if (!searchBar)  return showError(errorId, "Error getting the value to search");
    
    let value = searchBar.value;
    if(!value) return showError(errorId, " You must add a valid parcel id");
    if (isNaN(value)) return showError(errorId, value + " is not a valid parcel id");
    console.debug("searchBar", value)
    location.href = nextPage + value;
}

let showError = function (errorId, message) {
    if (!errorId) return alert(message);
    let p = document.getElementById(errorId);
    if (!p) return alert(message);
    p.textContent = message;
    p.style.visibility = "";
}