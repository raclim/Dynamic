window.addEventListener("DOMContentLoaded", () => {
    const goodsList = document.getElementById("goods__list");
    fetch("/goods").then(res => res.json()).then((data) => {
        console.log(data.goods);
      goodsList.innerHTML = goodyList(data.goods);
    });
  
    const goodForm = document.getElementById("good__form");
    goodForm.onsubmit = (event) => {
      event.preventDefault();
      const goodInput = event.target.elements["goodStuff"];
      const good = goodInput.value;
      goodInput.value = "";
      fetch("/goods",
        {
          method: "POST",
          body: JSON.stringify({ good: good }),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json()).then((data) => {
          goodsList.innerHTML = goodyList(data.goods);
        });
    }
  });
  
function goodyList(goods) {
    console.log(goods);
return goods.map((good) => {
    return `<li class="good__item" data-good="${good}">
            <span>${good}</span>
            <button onclick="removeGood(event)">Remove</button>
            </li>`;
}).join("");
}
  
function removeGood(event) {
const goodsList = document.getElementById("goods__list");
// access data attributes using dataset
const good = event.target.parentElement.dataset.good;
fetch(`/goods/${good}`,
    {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
    }
    }).then(res => res.json()).then((data) => {
    goodsList.innerHTML = goodyList(data.goods);
    });
}