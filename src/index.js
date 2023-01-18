//Setting all publics
const mainName = document.createElement('h2');
const mainImg = document.createElement('img');
const button = document.createElement('button');
let isGoodDog = true;
let dogCur = 0;
document.getElementById('dog-info').appendChild(button);
document.getElementById('dog-info').appendChild(mainImg)
document.querySelector('#dog-info').append(mainName);


// Filter Dogs
// const filterButton = document.querySelector('#good-dog-filter');
// let filtered = false
// filterButton.addEventListener('click', function () {
//     let tempDogs = document.getElementById('dog-bar');
//     while (tempDogs.firstChild) {
//         tempDogs.removeChild(tempDogs.firstChild);
//     }

// })
//Initial load
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/pups")
        .then(data =>
            data.json().then(dogs => {
                if (dogs[0].isGoodDog)
                    button.textContent = "Good Dog!";
                else
                    button.textContent = "Bad Dog!";
                mainImg.src = dogs[0].image;
                mainName.textContent = dogs[0].name;
                dogCur = dogs[0].id;
                dogs.forEach(dog => renderDog(dog))
            }))
})

button.addEventListener('click', function () {
    isGoodDog = !isGoodDog;
    if (isGoodDog)
        button.textContent = "Good Dog!";
    else
        button.textContent = "Bad Dog!";
    fetch(`http://localhost:3000/pups/${dogCur}`,
        {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ isGoodDog })
        })
})
function renderDog(dog) {
    isGoodDog = dog.isGoodDog;
    const dogName = document.createElement('span');
    dogName.textContent = dog.name;
    document.querySelector("#dog-bar").appendChild(dogName);
    dogName.addEventListener('click', () => {
        if (isGoodDog)
            button.textContent = "Good Dog!";
        else
            button.textContent = "Bad Dog!";
        mainImg.src = dog.image;
        mainName.textContent = dog.name;
        dogCur = dog.id;
    }
    )

}
