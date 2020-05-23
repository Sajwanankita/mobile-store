const devices = [
  {
    id: "1",
    name: "Samsung Galaxy M30s",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android",
    ram: "4 GB",
    storage: "4GB RAM, 64GB Storage",
    price: 5000
  },
  {
    id: "2",
    name: "Vivo U20",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android",
    ram: "4 GB",
    storage: "128 GB",
    price: 1700
  },
  {
    id: "3",
    name: "Motorola One Fusion.",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android",
    ram: "4 GB",
    storage: "128 GB",
    price: 9000
  },
  {
    id: "4",
    name: "Huawei Y8p.",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v8.1 (Oreo)",
    ram: "4 GB",
    storage: "128 GB",
    price: 1700
  }, {
    id: "5",
    name: "Honor X10.",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v8.1 (Oreo)",
    ram: "4 GB",
    storage: "128 GB",
    price: 8800
  },
  {
    id: "6",
    name: "OnePlus 7T Pro.",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v8.1 (Oreo)",
    ram: "4 GB",
    storage: "128 GB",
    price: 3400
  }, {
    id: "7",
    name: "Google Pixel 4 XL",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v8.1 (Oreo)",
    ram: "4 GB",
    storage: "128 GB",
    price: 12000
  },
  {
    id: "8",
    name: "Samsung Galaxy S10e.",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v8.1 (Oreo)",
    ram: "4 GB",
    storage: "128 GB",
    price: 2000
  },
  {
    id: "9",
    name: "Huawei P30 Pro.",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v8.1 (Oreo)",
    ram: "4 GB",
    storage: "128 GB",
    price: 5000
  },
  {
    id: "10",
    name: "Xiaomi Mi Note 10",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android 9.0 (Pie)",
    ram: "4 GB",
    storage: "128 GB",
    price: 1700
  },
  {
    id: "11",
    name: "iPhone SE",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android 9.0 (Pie); MIUI 9",
    ram: "4 GB",
    storage: "128 GB",
    price: 9000
  },
  {
    id: "12",
    name: "Realme X2 Pro",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v9.0 (Pie)",
    ram: "4 GB",
    storage: "128 GB",
    price: 1700
  }, {
    id: "13",
    name: "Xiaomi Redmi Note 9 Pro",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v9.0 (Pie)",
    ram: "4 GB",
    storage: "128 GB",
    price: 8800
  },
  {
    id: "14",
    name: "Samsung Galaxy M31",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android 9.0 (Pie); MIUI 10",
    ram: "4 GB",
    storage: "128 GB",
    price: 3400
  }, {
    id: "15",
    name: "Samsung Galaxy S20 Plus",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v9.0 (Pie)",
    ram: "4 GB",
    storage: "128 GB",
    price: 12000
  },
  {
    id: "16",
    name: "Vivo iQOO 3",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android v10 (Q)",
    ram: "4 GB",
    storage: "128 GB",
    price: 2000
  },
  {
    id: "17",
    name: "Xiaomi Redmi 8A Dual",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android 10.0; One UI 2",
    ram: "4 GB",
    storage: "128 GB",
    price: 12000
  },
  {
    id: "18",
    name: "Samsung Galaxy Z Flip",
    modelNumber: "SM-M307FZBGINS",
    colors: ["Red", "Blue"],
    screenSize: "5 inch",
    operatingSystem: "Android 10.0",
    ram: "4 GB",
    storage: "128 GB",
    price: 2000
  }
];


const cart = [];



// const cart = [{
//   id: "1",
//   cartDetails: [
//     {
//       device: {
//         id: "8",
//         name: "I Phone 1",
//         modelNumber: "SM-M307FZBGINS",
//         colors: ["Red", "Blue"],
//         screenSize: "5 inch",
//         operatingSystem: "Android",
//         ram: "4 GB",
//         storage: "128 GB",
//         price: "$500"
//       },
//       quantity: 1
//     }]
// }];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  devices,
  cart
};