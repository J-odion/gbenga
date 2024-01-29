document.addEventListener("DOMContentLoaded", function () {
  try {
    // Load contacts from local storage and display on the first page
    loadData();

    // Handle clicks on contact list items
    handleContactSelection();

    // Handle clicks on delete button
    handleDeleteAction();

    // Load contact details into the form on the edit page
    loadEditFormData();

    // Show contact details on the second page
    displayContactDetails();
  } catch (error) {
    console.error("Error during initialization:", error);
    alert("An error occurred during initialization. Please try again.");
  }
});

// Function to handle clicks on contact list items
function handleContactSelection() {
  const contactList = document.getElementById("contactList");
  if (contactList) {
    contactList.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        // Get the index of the clicked contact list item
        const contactIndex = event.target.dataset.index;
        // Navigate to the contact details page
        moveToContactDetails(contactIndex);
      }
    });
  }
}

// Function to handle delete button clicks on the edit page
function handleDeleteAction() {
  // Add event listener for delete button on the edit page
  const deleteButton = document.getElementById("deleteButton");
  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      performDeleteAction();
    });
  }
}

// Function to load contacts from local storage and display on the first page
function loadData() {
  try {
    const contactList = document.getElementById("contactList");
    if (contactList) {
      // Clear existing contact list
      contactList.innerHTML = "";

      // Retrieve contacts from local storage
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

      // Display each contact in the list
      contacts.forEach(function (contact, index) {
        const listItem = document.createElement("li");
        listItem.textContent = `${contact.firstname} ${contact.lastname}`;
        listItem.setAttribute("data-index", index);
        contactList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Error while loading contacts:", error);
    alert("An error occurred while loading contacts. Please try again.");
  }
}

// Function to load contact details into the form on the edit page
function loadEditFormData() {
  try {
    // Get contact index from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get("id");

    // Retrieve contacts from local storage
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = contacts[index];

    // Populate form fields with contact details
    document.getElementById("editFirstName").value = contact.firstname;
    document.getElementById("editLastName").value = contact.lastname;
    document.getElementById("editPhone").value = contact.phone;
    document.getElementById("editEmail").value = contact.email;
  } catch (error) {
    console.error("Error while loading contact details for edit:", error);
  }
}

// Function to navigate to the contact details page
function moveToContactDetails(index) {
  location.href = `contact-details-group.html?id=${index}`;
}

// Function to display contact details on the second page
function displayContactDetails() {
  try {
    // Get contact index from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get("id");
    if (index) {
      // Retrieve contacts from local storage
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      const contact = contacts[index];

      // Display contact details on the second page
      document.getElementById(
        "contact-name",
      ).textContent = `${contact.firstname} ${contact.lastname}`;
      document.getElementById("phone").textContent = `${contact.phone}`;
      document.getElementById("email").textContent = `${contact.email}`;
    }
  } catch (error) {
    console.log("Error while showing contact details:", error);
  }
}

// Function to save a new contact
function saveNewData() {
  try {
    // Retrieve contacts from local storage
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Get values from the add contact form
    const firstName = document.getElementById("addFirstName").value;
    const lastName = document.getElementById("addLastName").value;
    const phone = document.getElementById("addPhone").value;
    const email = document.getElementById("addEmail").value;

    // Basic input validation
    if (!firstName || !lastName || !phone || !email) {
      throw new Error("Please fill in all fields.");
    }

    // Add the new contact to the contacts array
    contacts.push({
      firstname: firstName,
      lastname: lastName,
      phone: phone,
      email: email,
    });

    // Save the updated contacts back to local storage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Redirect to the contact list page
    location.href = "index.html";
  } catch (error) {
    console.log("Error while saving new contact:", error);
  }
}

// Function to save an edited contact
function saveEditedData() {
  try {
    // Retrieve contacts from local storage
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Get values from the edit contact form
    const firstName = document.getElementById("editFirstName").value;
    const lastName = document.getElementById("editLastName").value;
    const phone = document.getElementById("editPhone").value;
    const email = document.getElementById("editEmail").value;

    // Get the index of the contact being edited
    const index = parseInt(location.search.split("=")[1]);

    // Basic input validation
    if (!firstName || !lastName || !phone || !email) {
      throw new Error("Please fill in all fields.");
    }

    // Update the contact in the contacts array
    contacts[index] = {
      firstname: firstName,
      lastname: lastName,
      phone: phone,
      email: email,
    };

    // Save the updated contacts back to local storage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Redirect to the contact details page
    location.href = `contact-details-group.html?id=${index}`;
  } catch (error) {
    console.log("Error while saving edited contact:", error);
    alert("Please fill in all fields.");
  }
}

// Function to delete a contact
function performDeleteAction() {
  try {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Get the index of the contact being edited
    const index = parseInt(location.search.split("=")[1]);

    // Remove the contact at the specified index
    contacts.splice(index, 1);

    // Save the updated contacts back to local storage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Redirect to the contact list page after deletion
    location.href = "index.html";
  } catch (error) {
    console.log("Error while deleting contact:", error);
  }
}

// Function to navigate to the edit contact page
function moveToEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("id");
  location.href = `edit-contact.html?id=${index}`;
}
