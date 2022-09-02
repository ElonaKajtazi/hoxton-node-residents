import express from "express";
import { houses, residents } from "./data";
const app = express();
app.use(express.json());
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
  let housesToSend = houses.map((house) => {
    let foundResidents = residents.filter(
      (resident) => resident.houseId === house.id
    );
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
app.post("/houses", (req, res) => {
  let errors: string[] = [];
  console.log(req.body.address);
  if (typeof req.body.address !== "string") {
    errors.push("address not given or not a string");
  }
  if (typeof req.body.type !== "string") {
    errors.push("type not given or not a string");
  }
  if (errors.length === 0) {
    const newHouse = {
      id: houses.length === 0 ? 1 : houses[houses.length - 1].id + 1,
      address: req.body.address,
      type: req.body.type,
    };
    houses.push(newHouse);
    res.send(newHouse);
  } else {
    res.status(400).send({ errors });
  }
});

app.listen(port, () => {
  console.log(`App listenin on port ${port}`);
});
