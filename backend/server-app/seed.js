require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./DB.js");
const State = require("./admin/state.model");
const City = require("./admin/city.model");
const ProductCatg = require("./admin/productcatg.model");
const Product = require("./Product/Product.model");
const Vender = require("./vender/vender.model");
const Customer = require("./customer/customer.modul");

const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const states = [
  { StId: 1, StName: "Maharashtra", Status: "active" },
  { StId: 2, StName: "Karnataka", Status: "active" },
  { StId: 3, StName: "Delhi", Status: "active" },
];

const cities = [
  { ctid: 1, ctname: "Mumbai", stid: 1, status: 1 },
  { ctid: 2, ctname: "Pune", stid: 1, status: 1 },
  { ctid: 3, ctname: "Bengaluru", stid: 2, status: 1 },
  { ctid: 4, ctname: "New Delhi", stid: 3, status: 1 },
];

const categories = [
  { PCatgId: "1", PCatgName: "Electronics" },
  { PCatgId: "2", PCatgName: "Fashion" },
  { PCatgId: "3", PCatgName: "Home & Living" },
  { PCatgId: "4", PCatgName: "Beauty" },
];

const vendors = [
  {
    VUserId: "demo.vendor",
    VUserPass: "vendor@123",
    VenderName: "NexBuy Demo Store",
    VAddress: "Pune, Maharashtra",
    VContact: 9876543210,
    VEmail: "vendor@nexbuy.demo",
    VPicName: "",
    VPicUrl: imageUrl("photo-1556742049-0cfed4f6a45d"),
    Vid: 1,
    Status: "active",
  },
];

const customers = [
  {
    CUserId: "demo.customer",
    CUserPass: "customer@123",
    CustomerName: "Demo Customer",
    StId: 1,
    CtId: 2,
    CAddress: "Pune, Maharashtra",
    CContact: 9123456780,
    CEmail: "customer@nexbuy.demo",
    CPicName: "",
    CPicUrl: imageUrl("photo-1494790108377-be9c29b29330"),
    Cid: 1,
    Status: "active",
  },
];

const products = [
  {
    pid: 1,
    pname: "Noise Cancelling Headphones",
    pprice: 4999,
    oprice: 3499,
    ppicname: "",
    PImgUrl: imageUrl("photo-1505740420928-5e560c06d30e"),
    pcatgid: 1,
    vid: 1,
    status: "Active",
  },
  {
    pid: 2,
    pname: "Minimal Smart Watch",
    pprice: 6999,
    oprice: 4899,
    ppicname: "",
    PImgUrl: imageUrl("photo-1523275335684-37898b6baf30"),
    pcatgid: 1,
    vid: 1,
    status: "Active",
  },
  {
    pid: 3,
    pname: "Portable Bluetooth Speaker",
    pprice: 2999,
    oprice: 2199,
    ppicname: "",
    PImgUrl: imageUrl("photo-1608043152269-423dbba4e7e1"),
    pcatgid: 1,
    vid: 1,
    status: "Active",
  },
  {
    pid: 4,
    pname: "Everyday Canvas Sneakers",
    pprice: 2499,
    oprice: 1799,
    ppicname: "",
    PImgUrl: imageUrl("photo-1542291026-7eec264c27ff"),
    pcatgid: 2,
    vid: 1,
    status: "Active",
  },
  {
    pid: 5,
    pname: "Classic Leather Backpack",
    pprice: 3299,
    oprice: 2399,
    ppicname: "",
    PImgUrl: imageUrl("photo-1553062407-98eeb64c6a62"),
    pcatgid: 2,
    vid: 1,
    status: "Active",
  },
  {
    pid: 6,
    pname: "Relaxed Cotton Shirt",
    pprice: 1799,
    oprice: 1199,
    ppicname: "",
    PImgUrl: imageUrl("photo-1602810318383-e386cc2a3ccf"),
    pcatgid: 2,
    vid: 1,
    status: "Active",
  },
  {
    pid: 7,
    pname: "Handmade Ceramic Vase",
    pprice: 1899,
    oprice: 1299,
    ppicname: "",
    PImgUrl: imageUrl("photo-1612196808214-b8e1d6145a8c"),
    pcatgid: 3,
    vid: 1,
    status: "Active",
  },
  {
    pid: 8,
    pname: "Warm Table Lamp",
    pprice: 2399,
    oprice: 1699,
    ppicname: "",
    PImgUrl: imageUrl("photo-1507473885765-e6ed057f782c"),
    pcatgid: 3,
    vid: 1,
    status: "Active",
  },
  {
    pid: 9,
    pname: "Soft Knit Throw Blanket",
    pprice: 2799,
    oprice: 1999,
    ppicname: "",
    PImgUrl: imageUrl("photo-1580301762395-21ce6b3b7e9c"),
    pcatgid: 3,
    vid: 1,
    status: "Active",
  },
  {
    pid: 10,
    pname: "Daily Hydration Face Serum",
    pprice: 1499,
    oprice: 999,
    ppicname: "",
    PImgUrl: imageUrl("photo-1556229010-6c3f2c9ca5f8"),
    pcatgid: 4,
    vid: 1,
    status: "Active",
  },
  {
    pid: 11,
    pname: "Botanical Body Care Set",
    pprice: 2199,
    oprice: 1499,
    ppicname: "",
    PImgUrl: imageUrl("photo-1556228720-195a672e8a03"),
    pcatgid: 4,
    vid: 1,
    status: "Active",
  },
  {
    pid: 12,
    pname: "Essential Makeup Brush Kit",
    pprice: 1299,
    oprice: 899,
    ppicname: "",
    PImgUrl: imageUrl("photo-1512496015851-a90fb38ba796"),
    pcatgid: 4,
    vid: 1,
    status: "Active",
  },
];

async function upsertMany(Model, key, records) {
  await Model.bulkWrite(
    records.map((record) => ({
      updateOne: {
        filter: { [key]: record[key] },
        update: { $set: record },
        upsert: true,
      },
    }))
  );
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || config.URL);
  await upsertMany(State, "StId", states);
  await upsertMany(City, "ctid", cities);
  await upsertMany(ProductCatg, "PCatgId", categories);
  await upsertMany(Vender, "Vid", vendors);
  await upsertMany(Customer, "Cid", customers);
  await upsertMany(Product, "pid", products);
  console.log(`Seeded ${products.length} products with production image URLs.`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
