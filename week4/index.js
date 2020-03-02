const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
function getGoods() {
    const contents = fs.readFileSync(path.join(__dirname, "./db/data.json"));
    const obj = JSON.parse(contents);
    return obj;
}
  
function addGood(good) {
    const goods = getGoods();
    // Push updates the original array
    goods.goods.push(good);
    fs.writeFileSync(path.join(__dirname, "./db/data.json"), JSON.stringify(goods));
    return goods;
}
  
function deleteGood(goodToDelete) {
    const goods = getGoods();
    // filter does NOT change the original array
    goods.goods = goods.goods.filter(good => good !== goodToDelete);
    fs.writeFileSync(path.join(__dirname, "./db/data.json"), JSON.stringify(goods));
    return goods;
}
  
app.get("/goods", (req, res) => {
    const goods = getGoods();
    res.json(goods);
});
  
app.post("/goods", (req, res) => {
    const good = req.body.good;
    const goods = addGood(good);
    // often, updated list will be returned by API
    res.json(goods);
});
  
app.delete("/goods/:name", (req, res) => {
    const goodToDelete = req.params.name;
    const goods = deleteGood(goodToDelete);
    res.json(goods);
});
  
app.listen(3000, () => {
    console.log("listening!");
});
  
