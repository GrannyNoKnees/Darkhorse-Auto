const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(
  "mongodb+srv://TrentonReeser06:Jewymcjewface:@darkhorseauto.b2egjrk.mongodb.net/darkhorseauto?retryWrites=true&w=majority&appName=DarkHorseAuto/dealership"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Mongo Error:", err));

// MODELS
const Car = mongoose.model('Car', {
  year: Number,
  make: String,
  model: String,
  price: Number,
  mileage: Number,
  image: String,
  vin: String
});

const Lead = mongoose.model('Lead', {
  name: String,
  phone: String,
  carId: String,
  createdAt: { type: Date, default: Date.now }
});

// ROUTES
app.get('/cars', async (req, res) => {
  res.json(await Car.find());
});

app.post('/cars', async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

app.post('/lead', async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

// ✅ Render uses process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
