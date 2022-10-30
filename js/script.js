const apiKey = "90a92fdc76cf4a30b395d65e4096ccfa";
const baseUrl = "https://api.spoonacular.com/";

const content = document.querySelector('#list-product');
const fetchHeader = {
    headers: {
        'x-api-key': apiKey
    }
};

function getItem() {
    let url = `${baseUrl}recipes/complexSearch`;
    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            console.log(resJson.results);
            let resepItems = "";
            resJson.results.forEach(result => {
                resepItems += `
                    <div class="dashboard-card">
                        <a href="detailResep.html" data-id="${result.id}" class="detail-resep">
                            <img src="${result.image}" class="card-image">
                        </a>
                        <div class="card-detail">
                            <h4>${result.title}</h4>
                        </div>
                    </div>
                `
            });
            content.innerHTML = resepItems;
            const detailResep = document.querySelectorAll('.detail-resep');
            detailResep.forEach(card => {
                card.onclick = (event) => {
                    getDetailResepItem(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.log(err);
        })
}

function getDetailResepItem(id) {
    let url = `${baseUrl}recipes/${id}/information`;
    console.log(id);
    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let headResep = `
                <div class="dashboard-resep">
                    <img src="${resJson.image}" alt="">
                    <div class="resep-title">
                        <h2><mark class="mark">${resJson.title}</mark></h2>
                    </div>
                </div>

                <div class="detail-resep">
                    <h1>Discover a new recipe every ${resJson.readyInMinutes} minutes</h1>
                    <h6>Health Score : ${resJson.healthScore}</h6>
                </div>
            `

            let bahan = "";
            resJson.extendedIngredients.forEach(ingredients => {
                console.log(ingredients);
                bahan += `
                    <p>${ingredients.name.toUpperCase()}</p>
                `;
            });

            let step = `
                ${resJson.instructions}
            `;
            console.log(resJson.instructions);


            document.querySelector('.head-resep').innerHTML = headResep;
            const bodyResep = document.querySelector('.body-resep');

            bodyResep.querySelector('.ingredients').innerHTML = bahan;
            bodyResep.querySelector('.instruction').innerHTML = step;
        }).catch(err => {
            console.log(err);
        })
}

document.addEventListener('DOMContentLoaded', function () {
    getItem();
    getDetailResepItem(716426);
})