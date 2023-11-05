const newBook = document.getElementById("addNewBook");

const allButtons = document.querySelectorAll(".delete");

allButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    let buttonName = button.getAttribute("name");
    console.log("button Name is " + buttonName);

    let response = await fetch(`/getAllBooks/${buttonName}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("Document deleted successfully");
    } else if (response.status === 400) {
      alert("Document not found");
    } else {
      alert("An error occurred");
    }
  });
});

newBook.addEventListener("click", () => {
  console.log("clicked");
});

const viewButtons = document.querySelectorAll(".view");

viewButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    let buttonISBN = button.getAttribute("name");
    console.log("button name is " + buttonISBN);
    // console.log(typeof buttonISBN);
    try {
      let response = await fetch(`/getAllBooks/${buttonISBN}`);
      console.log("fetched successful");
    } catch (error) {
      console.log("failed to fetch");
    }
  });
});
