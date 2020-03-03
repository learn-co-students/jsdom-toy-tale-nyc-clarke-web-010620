let addToy = false;
const toyURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", fetchToys)
document.addEventListener("DOMContentLoaded", formListener)
document.addEventListener("DOMContentLoaded", likeListener)

function fetchToys(){
  fetch(toyURL)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => newToy(toy))
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function newToy(toy){
  const collection = document.getElementById("toy-collection")
  const card = document.createElement('div')
  card.className = "card"
  card.dataset.id = toy.id
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img class="toy-avatar" src=${toy.image}>
  <p class="like-count">${toy.likes}</p>
  <button class="like-button">Like <3</button>
  `
  collection.append(card)
}

function formListener(){
  let newToyForm = document.getElementsByClassName("add-toy-form")[0]
  newToyForm.addEventListener('submit', function(event){
    event.preventDefault()
    let name = event.target.elements[0].value
    let imgUrl = event.target.elements[1].value
    fetch(toyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: imgUrl,
        likes: 0
      })
    })
    fetch(toyURL)
    .then(resp => resp.json())
    .then(toys => {
      newToy(toys[toys.length-1])
    })
  })
}

function likeListener(){
  const collection = document.getElementById("toy-collection")
  collection.addEventListener("click", function(event){
    if (event.target.className === "like-button") {
      addLike(event)
    }
  })
}

function addLike(event){
  let toyDiv = event.target.parentNode
  let likesNode = toyDiv.getElementsByClassName("like-count")[0]
  let likesCount = parseInt(toyDiv.getElementsByClassName("like-count")[0].innerHTML)
  fetch(`http://localhost:3000/toys/${toyDiv.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": (likesCount + 1)
    })
  })
  likesNode.innerHTML = (likesCount + 1)
}
