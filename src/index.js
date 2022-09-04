import './styles/style.css'; 

const modal = document.getElementById('modal');
const close = document.getElementById('close');
const btn = document.getElementById('add');
const form = document.getElementById('form');
const cardsContainer = document.querySelector('.cardsContainer');


btn.addEventListener('click', () => {
    modal.style.display = 'block';
});

window.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
})

close.addEventListener('click', () => {
    modal.style.display = 'none';
})

const description = document.getElementById('description');
const text = document.getElementById('text');
const date = document.getElementById('dateOption');
const priority = document.querySelectorAll('input[name="priority"]');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
    getData();
    resetData();
});

let tasks = [];



const getData = () => {
    const v = [...priority].filter(val => val.checked === true);

        tasks.push({
            text: text.value,
            description: description.value,
            date:date.value,
            priority: v[0].value
        });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    createCard();
    console.log(tasks);
}

const resetData = () => {
    text.value = "";
    description.value = "";
    date.value = "";
}

let cardBoards = [];

const createCard = () => {

      cardsContainer.innerHTML = "";

      tasks.map((val, index) =>
        {
            const cards = document.createElement('div');
            cards.classList.add('cards');
            cards.setAttribute('id',`cards${index}`);

            const title = document.createElement('h3');
            title.classList.add('title');
            title.setAttribute('id','title');

            title.textContent = `${val.text}`;

            cards.appendChild(title);

            const desc = document.createElement('p');
            desc.classList.add('desc');
            desc.setAttribute('id','desc');
            desc.textContent = `${val.description}`;
            cards.appendChild(desc);


            const dateOp = document.createElement('p');
            dateOp.classList.add('date');
            dateOp.setAttribute('id','date');

            dateOp.textContent = `${val.date}`;

            cards.appendChild(dateOp);


            const priority = document.createElement('p');
            priority.textContent = `${val.priority}`;
            cards.appendChild(priority);

            const icons = document.createElement('div');
            icons.classList.add('icons');

            const edit = document.createElement('span');
            edit.classList.add('material-icons');
            edit.setAttribute('id','edit');
            edit.setAttribute('value',`${index}`);

            edit.textContent = 'edit';
            icons.appendChild(edit);


            const deleteBin = document.createElement('span');
            deleteBin.classList.add('material-icons');
            deleteBin.setAttribute('id','delete');
            deleteBin.textContent = 'delete';
            icons.appendChild(deleteBin);

            cards.appendChild(icons);


            cardsContainer.appendChild(cards);
        });
        cardBoards = [...document.querySelectorAll('.cards')];
        
        console.log(cardBoards);

        const del = document.querySelectorAll('#delete');
        const edit = document.querySelectorAll('#edit');


        del.forEach( (x) => {
            x.addEventListener('click', () => {
                console.log(x);
                       let index = parseInt(x.getAttribute("value"));
                       x.parentElement.parentElement.remove();
                       tasks.splice(index,1);
                       localStorage.setItem("tasks", JSON.stringify(tasks));
                });
            }
        );

        edit.forEach( (x) => {
            x.addEventListener('click', () => {
                    console.log(x);

                    const v = [...priority].filter(val => val.checked === true);
                    let index = parseInt(x.getAttribute("value"));
                    
                    text.value =  tasks[index].text 
                    description.value =  tasks[index].description;
                    date.value =  tasks[index].date ;
                    v[0].value =  tasks[index].priority;

                    modal.style.display = 'block';

                    x.parentElement.parentElement.remove();
                    tasks.splice(index,1);
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                });
            }
        );
}

(() => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || []
    console.log(tasks);
    createCard();
})();