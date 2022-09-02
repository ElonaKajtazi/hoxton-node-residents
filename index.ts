import express from "express";
import { houses, residents} from "./data";
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
    console.log(foundResidents)
    return { ...house, houseResidents: foundResidents };
  });

  res.send(housesToSend);
});
app.get("/residents", (req, res) => {
  res.send(residents);
});

app.listen(port, () => {
  console.log(`App listenin on port ${port}`);
});
// Let's see if the node_modules shows up on github
