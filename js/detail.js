const apiKey = '9af7d2491eaa4bd79109956a28795233';
const baseUrl = 'https://api.spoonacular.com/';

const content = document.querySelector('#list-product');
const fetchHeader = {
  headers: {
    'x-api-key': apiKey,
  },
};

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
// console.log('aaa', params);

let url = `${baseUrl}recipes/${params.id}/information`;
fetch(url, fetchHeader)
  .then((response) => response.json())
  .then((resJson) => {
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
            `;

    let bahan = '';
    resJson.extendedIngredients.forEach((ingredients) => {
      console.log(ingredients);
      bahan += `<p>${ingredients.name.toUpperCase()}</p>`;
    });

    let step = `${resJson.instructions}`;
    console.log(resJson.instructions);

    document.querySelector('.head-resep').innerHTML = headResep;
    const bodyResep = document.querySelector('.body-resep');

    bodyResep.querySelector('.ingredients').innerHTML = bahan;
    bodyResep.querySelector('.instruction').innerHTML = step;
  })
  .catch((err) => {
    console.log(err);
  });
