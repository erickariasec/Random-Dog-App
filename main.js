// API Dogs Random
const urlAPIDogsRandom = "https://api.thedogapi.com/v1/images/search?limit=4&api_key=a20af28d-f5cc-4183-a370-55eb7b496042";

// API Dogs Favorite
const urlAPIDogsFavorite = "https://api.thedogapi.com/v1/favourites?api_key=a20af28d-f5cc-4183-a370-55eb7b496042";

// API Add Dogs to Favorite
const urlAPIAddDogsFavorite = "https://api.thedogapi.com/v1/favourites?api_key=a20af28d-f5cc-4183-a370-55eb7b496042";

// API Remove Dogs from Favorite
const urlAPIRemoveDogsFavorite = "https://api.thedogapi.com/v1/favourites/";

// Function to get random dogs
const getDogsRandom = async () => {
    const response = await fetch(urlAPIDogsRandom);
    const data = await response.json();
    const div = document.querySelector("#randomDogsContainer");
    const array = [];
    data.forEach((dog) => {
        div.innerHTML = "";
        // Creando mi imagen
        const img = document.createElement("img");
        img.src = dog.url;
        img.alt = "This is a random dog";
        img.className = "img-random";
        img.width = 200;
        img.height = 200;
        array.push(img);

        // Creando mi button
        const button = document.createElement("button");
        button.innerHTML = "⭐<br>Add to favorites";
        button.onclick = () => {
            addDogsToFavorite(dog.id);
        };
        array.push(button);
    });
    div.append(...array);
};

getDogsRandom();

// Function to get favorite dogs
const getDogsFavorite = async () => {
    const response = await fetch(urlAPIDogsFavorite);
    const data = await response.json();
    const div = document.querySelector("#favoriteDogsContainer");
    const array  = [];
    data.map(favDog => {
        div.innerHTML = '';
        // Creando mi imagen
        const img = document.createElement("img");
        img.src = favDog.image.url;
        img.alt = "This is a favorite dog";
        img.className = "img-favorite";
        img.width = 200;
        img.height = 200;
        array.push(img);

        // Creando mi button
        const button = document.createElement("button");
        button.innerHTML = "❌<br>Remove from favorites";
        button.onclick = () => {
            removeDogsFromFavorite(favDog.id);
        }
        array.push(button);
    });
    div.innerHTML = "";
    div.append(...array);
}

getDogsFavorite();

// Function to add dogs to favorite
const addDogsToFavorite = async (id) => {
    const response = await fetch(urlAPIAddDogsFavorite, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    getDogsFavorite();
}

// Function to remove dogs from favorite
const removeDogsFromFavorite = async (id) => {
    const response = await fetch(`${urlAPIRemoveDogsFavorite}${id}?api_key=a20af28d-f5cc-4183-a370-55eb7b496042`, {
        method: "DELETE",
    });
    getDogsFavorite();
};