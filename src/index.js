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



  const toyCollection = document.getElementById("toy-collection")
  console.log(toyCollection)
  
  fetch("http://www.localhost:3000/toys")
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      body.forEach(toy => {
        let eachToy = document.createElement("div")
        eachToy.className = "card"
        eachToy.innerHTML = `<h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar">
        <p>${toy.likes} likes</p>
        <button class="like-btn" data-id=${toy.id} >Like ❤️ </button>
        `
        toyCollection.append(eachToy)
      }
        )
    })

    let form = document.getElementsByClassName("add-toy-form")[0]
    
    form.addEventListener("submit", function(event){
      //event.preventDefault()  
      let input1 = document.querySelectorAll("input")[0].value
      let input2 = document.querySelectorAll("input")[1].value
      console.log(input1)
      console.log(input2)

      const data = {name: input1,
                    image: input2,
                    likes: 0}

      fetch("http://www.localhost:3000/toys", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      })

      form.reset()
    })


    // document.querySelectorAll("img")[0].draggable()
    

    toyCollection.addEventListener("click", function(event){

      event.preventDefault()  

      let ourP = event.target.parentNode.querySelector('p')
      let numOfLikes = parseInt(ourP.innerText.split(" ")[0])

      if (event.target.className === "like-btn")

        numOfLikes++
        ourP.innerText = `${numOfLikes} likes`

        const data = {likes: numOfLikes}

        fetch(`http://www.localhost:3000/toys/${event.target.dataset.id}`, {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify(data)
        })


      })


});


