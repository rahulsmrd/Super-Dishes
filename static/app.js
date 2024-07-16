console.log("This is working 23");

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

document.addEventListener('DOMContentLoaded', () => {
    const dishListElement = document.getElementById('dish-list');

    const fetchDishes = async () => {
        try {
            const response = await fetch('v1/dishes/list/');
            const dishes = await response.json();
            renderDishes(dishes);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    const toggleDishStatus = async (dishId) => {
        try {
            await fetch(`v1/dishes/${dishId}/update/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                payload: {}
            });
            fetchDishes();
        } catch (error) {
            console.error('Error toggling dish status:', error);
        }
    };

    const renderDishes = (dishes) => {
        dishListElement.innerHTML = '';
        dishes.forEach(dish => {
            const dishItemElement = document.createElement('div');
            dishItemElement.className = 'col-md-5 mx-5 my-3';
            dishItemElement.innerHTML = `
            <div class="card" style="border-radius:1em; border: 2px solid black">
                <div class="card-body">
                    <h3 class="text-center">${dish.dishId}. ${dish.dishName}</h3>
                    <img src="${dish.imageUrl}" alt="${dish.dishName}" class="img-thumbnail"><br>
                    <button class="btn btn-outline-success form-control mt-5 fs-5">${dish.isPublished ? 'Unpublish' : 'Publish'}</button>
                    <hr>
                </div>
            </div>
            `;
            const toggleButton = dishItemElement.querySelector('button');
            toggleButton.addEventListener('click', () => toggleDishStatus(dish.dishId));
            dishListElement.appendChild(dishItemElement);
        });
    };

    fetchDishes();
});
