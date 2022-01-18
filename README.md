<h1 align="center">Inventify - Shopify Backend Challenge</h1>

<p align="center">
  <a href="https://www.codefactor.io/repository/github/kevinxyc1/inventify">
    <img src="https://www.codefactor.io/repository/github/kevinxyc1/inventify/badge" alt="CodeFactor" />
  </a>
  <img alt="node-current" src="https://img.shields.io/node/v/express">
  <img alt="NPM" src="https://img.shields.io/npm/l/express">
</p>

<p align="center">
  <a href="https://inventify-app.herokuapp.com/">View Demo
  </a>
</p>

---

Inventify is an inventory tracking web application designed for logistic companies.

---

- [1. About The Project](#1-about-the-project)
- [2. Get Started](#2-get-started)
- [3. Future work](#3-future-work)

## 1. About The Project

### Basic Feature
It satisfies the basic CRUD functionality including:
- Create inventory items in **Add Item** page
- Edit items by clicking on the image of item and **Edit**
  - Attributes that can be edited: name, tag, image cover, date added, count, description
- Delete items by clicking on the image of item and **Delete**
- View a list of items
  - **Home** page displays the 10 most recent added items
  - **Inventory** page displays all items
- Implemented Input Validation & Error Handling
  - cannot add/update an item without entering name
  
### Additional Feature
- Search and filter implemented in **Inventory** page
  - based on item name/tag (regex pattern matching)
  - based on item date added (filter all items with date-added after or/and before a date)
  - implemented with MongoDB query

### Technologies
- **Node/Express** backend in Javascript
- **MongoDB/Mongoose** database
- **HTML/CSS/EJS** frontend
- **Heroku** deployment
  
## 2. Get Started

### Prerequisites

- Node v12.13.0
- An available MongoDB cluster: a cluster was created for this project on [MongoDB Atlas](https://cloud.mongodb.com) but for local development you will need to start your own.

### Install

1. git clone the project

2. Install NPM packages and dependencies
```bash
npm install
```

3. Create `.env` file in the root directory and enter DATABASE_URL for MongoDB. For Example:
```bash
DATASET_URL="mongodb://localhost/inventify"
```
4. Build and start the app locally
```bash
npm run start
```

5. View the app in `localhost:3000`

## 3. Future work

- Check for duplicated names when creating a new item
- Add features for creating warehouses and assigning items to different locations
- Improve frontend styling
- Allow storing images with generated thumbnails
