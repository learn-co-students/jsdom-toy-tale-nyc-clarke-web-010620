let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyDiv = document.getElementById("toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const BASE_TOY = "http://localhost:3000/toys"

  fetch(BASE_TOY)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(addToys)
  })
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const addToys = (toy) => {
    let div = document.createElement("div")
    div.class = "card"
    div.dataset.id = toy.id
    div.innerHTML = `
    <h2>${toy.name}</h2>
    <img alt="" class="toy-avatar" src="${toy.image}" />
    <p>${toy.likes} likes.</p>
    <button value="like-btn" class="like-btn">Like</button>
    `
    toyDiv.append(div)
  }

  document.addEventListener("click", function(event) {

    switch (event.target.value) {
      case "Create New Toy":
        const name = document.getElementsByClassName("input-text")[0].value
        const image = document.getElementsByClassName("input-text")[1].value
        const newToy = {name, image, likes: 0}
        fetch(`${BASE_TOY}`, {
          method: "POST",
          headers: {
            "content-type": "application/json", 
            accept: "application/json"
          },
          body: JSON.stringify(newToy)
        })
        break;
      case "like-btn":
        const div = event.target.parentNode
        let likeCounter = div.children[2].innerText.split(" ")
        console.log(likeCounter)
        let increaseLikes = parseInt(likeCounter[0]) + 1
        div.children[2].innerText = `${increaseLikes} ${likeCounter[1]}`
        
        const likes = {likes: increaseLikes}
        fetch(`${BASE_TOY}/${div.dataset.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json", 
            accept: "application/json"
          },
          body: JSON.stringify(likes)
        })

        break;
      default:
        break;
    }
  })

});

