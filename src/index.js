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

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(addAToy))

  
  document.addEventListener('submit', event => {
    event.preventDefault()
    const theToyForm = document.querySelector(".add-toy-form");
    let toyName = event.target.name.value
    let toyImage = event.target.image.value
    
    let newToy = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(toy => {
      
      addAToy(toy) 
      theToyForm.reset()
      addToy = !addToy
      toyForm.style.display = "none"

    })

  })
  
  document.addEventListener('click', event =>{
    
    if (event.target.className === 'like-btn'){
      let likes = parseInt(event.target.previousElementSibling.innerText)
      likes++
      
      fetch(`http://localhost:3000/toys/${event.target.parentNode.dataset.id}`,{
        method: 'PATCH',
        headers: {
          "content-type": 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({"likes": likes})
      })
      .then(resp => resp.json())
      .then(response => {
        event.target.previousElementSibling.innerText = `${response.likes} Likes`
      })
    }
  })
  
  function addAToy(toy){
    let toyCollection = document.getElementById('toy-collection')
    let li = document.createElement('li')
    li.className = "card"
    li.dataset.id = toy.id
  
    li.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    `
  
    toyCollection.append(li)
  }
});
