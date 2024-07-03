$(document).ready(function() {
    // Function to add a new task item
    function newItem() {
        let li = $('<li></li>');
        let taskItem = $('#input').val();
        li.append(taskItem);

        if (taskItem === '') {
            alert("You must write something!");
        } else {
            $('#list').append(li);
            $('#input').val(''); // Clear the input field, once the item is appended to the list
        }

        // 2. Crossing out an item from the list of items; on double click
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

        // 3. Adding a checkbox for marking items off as complete
        let completeCheckbox = $('<input type="checkbox" class="completeCheckbox">');
        li.prepend(completeCheckbox); // Use prepend to place the checkbox at the beginning

        completeCheckbox.on("change", function() {
            if (this.checked) {
                $(this).css('accent-color', '#1dca17');
                li.addClass("strike");
                li.append(" (completed)");
            } else {
                $(this).css('accent-color', '#1dca17');
                li.removeClass("strike");
                li.contents().filter(function() {
                    return this.nodeType === 3 && this.nodeValue.includes("(completed)");
                }).remove();
            }
        });

        // 4. Adding a Delete X marker to delete the item from the list
        let crossOutX = $('<button class="deleteButton">X</button>');
        li.append(crossOutX);

        crossOutX.on("click", deleteListItem);
        function deleteListItem(){
            li.addClass("delete");
        }

        // 5. Reordering the items:
        $('#list').sortable();
    }

    // Bind the click event to the Add button
    $('#button').on('click', newItem);

    // Bind the keypress event to the input field // adding a second option to confirm an item to the list
    $('#input').on('keypress', function(event) {
        if (event.which === 13) { // 13 is the Enter key
            newItem();
            event.preventDefault(); // Prevent the form from submitting
        }
    });
});
