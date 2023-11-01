const displayBtn = document.querySelector('#display')

displayBtn.addEventListener('click', fetchGroceries)

function fetchGroceries() {
    fetch("http://localhost:3000/grocery_list")
        .then(resp => resp.json())
        .then(data => {
            addItem(data)
        })
}


function addItem(data) {
    const items = data
    const groceryList = document.querySelector('#groceries')
    groceryList.textContent = ''
    items.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item.name
        groceryList.appendChild(li)
    });
}

const form = document.getElementById('groceryForm')


form.addEventListener('submit', createGroceryItem)


async function createGroceryItem(e) {
    e.preventDefault()
    const groceryTyped = e.target.grocery_item.value

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: groceryTyped
        })
    }
    const response = await fetch('http://localhost:3000/grocery_list', options)

    if (response.status === 201) {
        e.target.grocery_item.value = ""
    }
}
