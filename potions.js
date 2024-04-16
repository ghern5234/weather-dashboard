const potionsUrl = "https://api.potterdb.com//v1/potions";

async function randomPotion() {
  const potionsUrl = "https://api.potterdb.com//v1/potions";

  await fetch(potionsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (potionsObj) {
      let data = potionsObj.data;
      console.log(data);
      randomPotion = data[Math.floor(Math.random() * data.length)];
      const potion = {
        Name: randomPotion.attributes.name,
      };

      console.log(potion);
    });
  function renderPotionName(randomPotion) {
    const titleEl = document.getElementById("one");
    titleEl.textContent = potion;
  }
  renderPotionName();
}

randomPotion();

