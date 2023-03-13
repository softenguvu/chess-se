// Wait for the DOM to be loaded, then initalize the event listners for things
document.addEventListener("DOMContentLoaded", function(event) {
    initEvListener();
    console.log("sdajksd;a");
})

// Function that handles adding event listeners to everything
function initEvListener() {
    const a1Board = document.getElementById("a1");
    a1Board.addEventListener("click", function(event) {
        console.log("In cell a1 event listener");
    })
}