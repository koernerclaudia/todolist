$(document).ready(function() {
    // Function to add a new item
    function newItem() {
        let li = $('<li></li>');
        let inputValue = $('#input').val();
        li.append(inputValue);

        if (inputValue === '') {
            alert("You must write something!");
        } else {
            $('#list').prepend(li);
            $('#input').val(''); // Clear the input field
        }

        addEventHandlers(li);
       
    }

    // Function to add event handlers to list items
    function addEventHandlers(li) {
        // Crossing out an item from the list of items on double click
        li.on("dblclick", function() {
            li.toggleClass("strike2");
            if (li.hasClass("strike2")) {
                li.append(" (irrelevant)");
            } else {
                li.contents().filter(function() {
                    return this.nodeType === 3 && this.nodeValue.includes("(irrelevant)");
                }).remove();
            }
        
        });

        // Adding a checkbox for marking items
        let crossOutCheckbox = $('<input type="checkbox" class="crossOutCheckbox">');
        li.prepend(crossOutCheckbox); // Use prepend to place the checkbox at the beginning

        crossOutCheckbox.on("change", function() {
            if (this.checked) {
                $(this).css('accent-color', 'green');
                li.addClass("strike");
                li.append(" (completed)");
            } else {
                $(this).css('accent-color', '');
                li.removeClass("strike");
                li.contents().filter(function() {
                    return this.nodeType === 3 && this.nodeValue.includes("(completed)");
                }).remove();
            }
            
        });

        // Adding CLASS DELETE (DISPLAY: NONE) from the css:
        let crossOutButton = $('<button class="deleteButton">X</button>');
        li.append(crossOutButton);

        crossOutButton.on("click", function() {
            li.addClass("delete");
           
        });
    }
    // Reordering the items
    $('#list').sortable();
     
    // Bind the click event to the Add button
    $('#button').on('click', newItem);

    // Bind the keypress event to the input field
    $('#input').on('keypress', function(event) {
        if (event.which === 13) { // 13 is the Enter key
            newItem();
            event.preventDefault(); // Prevent the form from submitting
        }
    });
});
