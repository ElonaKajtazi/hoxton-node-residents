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
app.post("/residents", (req, res) => {
  let errors: string[] = [];
  if (typeof req.body.name !== "string") {
    errors.push("Name not provided or not a string");
  }
  if (typeof req.body.age !== "number") {
    errors.push("Age not provided or not a number");
  }
  if (typeof req.body.gender !== "string") {
    errors.push("Gender not provided or not a string");
  }
  if (typeof req.body.houseId !== "number") {
    errors.push("HouseId not provided or not a number");
  }
  if (errors.length === 0) {
    let newResident = {
      id: residents.length === 0 ? 1 : residents[residents.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      houseId: req.body.houseId,
    };

    residents.push(newResident);
    res.send(newResident);
  } else {
    res.status(400).send(errors);
  }
});

app.patch("/houses/:id", (req, res) => {
  const id = Number(req.params.id);
  let match = houses.find((house) => house.id === id);

  if (match) {
    if (req.body.address) {
      match.address = req.body.address;
    }
    if (req.body.type) {
      match.type = req.body.type;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "House not found!" });
  }
});

app.patch("/residents/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = residents.find((resident) => resident.id === id);
  if (match) {
    if (req.body.name) {
      match.name = req.body.name;
    }
    if (req.body.age) {
      match.age = req.body.age;
    }
    if (req.body.gender) {
      match.gender = req.body.gender;
    }
    if (req.body.houseId) {
      match.houseId = req.body.houseId;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "Resident not found" });
  }
});
app.listen(port, () => {
  console.log(`App listenin on port ${port}`);
});
