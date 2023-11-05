const allButtons = document.querySelectorAll(".delete");

allButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    let buttonISBN = button.getAttribute("name");
    console.log("button ISBN is " + buttonISBN);

    let response = await fetch(`/getAllBooks/${buttonISBN}`, {
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

const viewButtons = document.querySelectorAll(".view");

viewButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    let buttonISBN = button.getAttribute("name");
    console.log("button name is " + buttonISBN);
    console.log(typeof buttonISBN);
    try {
      await fetch(`/getAllBooks/${buttonISBN}`);
      console.log("fetched successful");
    } catch (error) {
      console.log("failed to fetch");
    }
  });
});

const newBook = document.getElementById("addNewBook");

newBook.addEventListener("click", async function () {
  await fetch("/getAllBooks/newBook", { method: "POST" });
  window.open("https://www.google.com");
});
