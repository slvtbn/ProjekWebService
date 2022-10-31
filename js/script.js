const apiKey = '9af7d2491eaa4bd79109956a28795233';
const baseUrl = 'https://api.spoonacular.com/';

const content = document.querySelector('#list-product');
const fetchHeader = {
  headers: {
    'x-api-key': apiKey,
  },
};

function getItem() {
  let url = `${baseUrl}recipes/complexSearch`;
  fetch(url, fetchHeader)
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
      console.log(resJson.results);
      let resepItems = '';
      resJson.results.forEach((result) => {
        resepItems += `
                    <div class="dashboard-card">
                        <a href="#" data-id="${result.id}" class="detail-resep">
                            <img src="${result.image}" data-id="${result.id}" class="card-image">
                        </a>
                        <div class="card-detail">
                            <h4>${result.title}</h4>
                        </div>
                    </div>
                `;
      });
      content.innerHTML = resepItems;
      const detailResep = document.querySelectorAll('.detail-resep');
      console.log('detail resep :', detailResep);
      detailResep.forEach((card) => {
        card.onclick = (event) => {
          console.log('aaaa', event.target.dataset);
          getDetailResepItem(event.target.dataset.id);
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDetailResepItem(id) {
  let url = `${baseUrl}recipes/${id}/information`;
  console.log('test');
  console.log(id);
  window.location.replace('detailResep.html?id=' + id);
}

document.addEventListener('DOMContentLoaded', function () {
  getItem();
  // getDetailResepItem(id);
});
