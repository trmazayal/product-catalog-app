# Product Catalog App - Privy Mini Project

## Description

This is a simple product catalog app that allows users to view, create, update, and delete products. The app is built using Nuxt. The backend is a mock API built using [MockAPI](https://mockapi.io/).

## Setup

Minimal setup is required to get the app running. Make to run [this](minimal-starter.md) setup before running the app.

## Endpoints

Base URL: `https://611a1a2fcbf1b30017eb54c1.mockapi.io/`

Example Object:

```json
{
  "title": "Refined Rubber Bike",
  "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
  "price": "838.00",
  "image": "http://placeimg.com/640/480/food",
  "created_at": "2021-08-16T05:30:48.867Z",
  "updated_at": "2021-08-16T01:43:47.287Z",
  "id": "1"
}
```

- `/products?page=1&limit=10`: Get a list of products
- `/products`: Create a product
- `/products/:id`: Get a single product
- `/products/:id`: Update a product
- `/products/:id`: Delete a product