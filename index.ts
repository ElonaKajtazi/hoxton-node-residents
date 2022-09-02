import express from "express";
import { houses, residents } from "./data";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send(`<h1>House/Residents API</h1>
  <h2>Available resources:</h2>
  <ul>
    <li><a href="/houses">Houses</a></li>
    <li><a href="/residents">Residents</a></li>

  </ul>`);
});

app.get("/houses", (req, res) => {
  // let dogsToSend = dogs.map(dog => {
  //   let owner = owners.find(owner => owner.id === dog.ownerId)
  //   return { ...dog, owner }
  // })
  let housesToSend = houses.map((house) => {
    let foundResidents = residents.filter(
      (resident) => resident.houseId === house.id
    );
    console.log(foundResidents);
    return { ...house, residents: foundResidents };
  });

  res.send(housesToSend);
});
app.get("/residents", (req, res) => {
  let residentsToSend = residents.map((resident) => {
    const foundHouse = houses.find((house) => house.id === resident.houseId);
    return { ...resident, house: foundHouse };
  });
  res.send(residentsToSend);
});

app.listen(port, () => {
  console.log(`App listenin on port ${port}`);
});
// Let's see if the node_modules shows up on github
