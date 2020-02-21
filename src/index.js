let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const collection = document.getElementById('toy-collection')
  const toyCard = function(toy){
    let tCard = document.createElement('div')
    tCard.class = "card"
    let name = toy.name
    let image = toy.image
    let likes = toy.likes
    tCard.innerHTML =
      `<h2>${name}</h2>
      <img class= 'toy-avatar' src = "${image}"/>
      <p>${likes}</p>
      <button class= 'like-btn' data-id=${toy.id}>Like</button>`
    collection.appendChild(tCard)
  }
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => toyCard(toy))),
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  toyForm.addEventListener('submit', function(e){
    e.preventDefault()
    let toy = {}
    toy['name'] = e.target.name.value
    toy['image'] = e.target.image.value
    toy['likes'] = 0
    toyCard(toy)
    console.log(toy.name)
    fetch(`http://localhost:3000/toys`,{
      method: "Post",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    e.target.reset()
  })
  const likeButtons = document.getElementsByClassName('like-btn')
  collection.addEventListener('click', function(e){
    let likesDiv = e.target.parentNode.querySelector('p')
    let numOfLikes = parseInt(likesDiv.innerText.split(" ")[0])
    if (e.target.className === 'like-btn'){
      numOfLikes++
      likesDiv.innerText = numOfLikes
      const hash = {'likes': numOfLikes}
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(hash)
    })
    }
  })
});
