let addToy = false;

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

  const baseURL = "http://localhost:3000/toys/"

  fetch(baseURL).then(response=> response.json())
  .then( json => {


    json.forEach( toy => { createCard(toy)
    })
  }
  )

  document.addEventListener("submit", function(e){
    e.preventDefault()

    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    
    fetch(baseURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    
    location.reload();
  })

document.addEventListener("click", function(e){
  console.log(e.target.className)
  if (e.target.className === "like-btn"){
    addlike(e)
  }
})






});


let createCard = function (toy){
  let toybox = document.getElementById("toy-collection")
  let div = document.createElement("div")
  div.className = "card"
  div.innerHTML = `    
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`
  div.dataset.id = toy.id
  toybox.append(div)
}

let addlike = function(e) {
  let likes = e.target.parentNode.querySelector("p")
  
  num = likes.innerText.split(" ")[0]
  num++

  likes.innerText = `${num} Likes`

  const baseURL = `http://localhost:3000/toys/${e.target.parentNode.dataset.id}`
  fetch(baseURL, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({likes: num})
  })

}
