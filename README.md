<h1 align="center">Inventify - Shopify Backend Challenge</h1>

<p align="center">
  <a href="https://www.codefactor.io/repository/github/kevinxyc1/inventify">
    <img src="https://www.codefactor.io/repository/github/kevinxyc1/inventify/badge" alt="CodeFactor" />
  </a>
  <a href="https://pypi.org/project/gym-simplifiedtetris/">
    <img src="https://img.shields.io/pypi/pyversions/gym-simplifiedtetris?style=for-the-badge">
  </a>
  <a href="/LICENSE.md">
    <img src="https://img.shields.io/github/license/OliverOverend/gym-simplifiedtetris?color=darkred&style=for-the-badge">
  </a>
  <img alt="NPM" src="https://img.shields.io/npm/l/express">
  <a href="https://github.com/OliverOverend/gym-simplifiedtetris/commits/dev">
    <img src="https://img.shields.io/github/last-commit/OliverOverend/gym-simplifiedtetris/dev?style=for-the-badge">
  </a>
  <a href="https://github.com/OliverOverend/gym-simplifiedtetris/releases">
    <img src="https://img.shields.io/github/release-date/OliverOverend/gym-simplifiedtetris?color=teal  &style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="https://inventify-app.herokuapp.com/">View Demo
  </a>
</p>

---

Inventify is an inventory tracking web application designed for logistic companies.

---

- [1. About The Project](#1-about-the-projects)
- [2. Installation](#2-installation)
- [3. Agents and environments](#3-agents-and-environments)
- [4. Future work](#4-future-work)
- [5. Acknowledgements](#5-acknowledgements)

## 1. About The Projects

#### Basic Feature
It satisfies the basic CRUD functionality including:
- Create inventory items (with image upload)
- Edit items (name, tag, image cover, date added, count, description)
- Delete items
- View a list of items
  - **Homepage** displays the 10 most recent added items
  - **Inventory** page displays all items 
  
#### Additional Feature
- Search and filter based on name, tag, date added after, date added before in **Inventory** page

### Technologies
- **Node/Express** backend in Javascript
- **MongoDB/Mongoose** database
- **HTML/CSS/EJS** frontend
  
## 2. Installation

### Prerequisites

- Node v12.13.0
- An available MongoDB cluster: a cluster was created for this project on [MongoDB Atlas](https://cloud.mongodb.com) but for local development you will need to start your own.

### Install

1. git clone the project

2. Install NPM packages and dependencies
The package is pip installable:
```bash
npm install
```

3. Create `.env` file in the root directory and enter DATABASE_URL for MongoDB
Example:
```bash
DATASET_URL="mongodb://localhost/inventify"
```
4. Build and start the app locally
```bash
npm run start
```

5. View the app in `localhost:3000`

## 3. Agents and environments

Three agents — described in [gym_simplifiedtetris/agents](https://github.com/OliverOverend/gym-simplifiedtetris/blob/master/gym_simplifiedtetris/agents) — are provided. There are currently 64 environments provided; a description can be found in [gym_simplifiedtetris/envs](https://github.com/OliverOverend/gym-simplifiedtetris/blob/master/gym_simplifiedtetris/envs).

## 4. Future work

- Normalise the observation spaces
- Implement an action space that only permits non-terminal actions to be taken
- Implement more shaping rewards: potential-style, potential-based, dynamic potential-based, and non-potential. Optimise their weights using an optimisation algorithm.

## 5. Acknowledgements

This package utilises several methods from the [codebase](https://github.com/andreanlay/tetris-ai-deep-reinforcement-learning) developed by andreanlay (2020) and the [codebase](https://github.com/Benjscho/gym-mdptetris) developed by Benjscho (2021).
