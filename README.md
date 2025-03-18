# E-commerce Vue App

A simple web application developed with Vue.js + shadcn-vue and TypeScript that simulates a shopping cart with shipping quote functionality.

## Features

- Generation of random carts from the DummyJSON API
- Detailed visualization of products in the cart
- Customer shipping data capture through a modal form
- Shipping quotes through a mockup API service
- Responsive design with modular and reusable components

## Setup

To set up the project:

```bash
# Install dependencies
npm install

# Start the development server on port 5001
npm run dev
```

The project will be available at `http://localhost:5001`

## Project Structure

- `src/api`: Services for API communication
- `src/components`: Reusable components
- `src/stores`: State management with Pinia
- `src/types`: TypeScript type definitions
- `src/views`: Main application views

## Backend

The application communicates with two APIs:

1. DummyJSON API: To obtain random cart data
2. FlappCommerce API (mock): Simulation of a shipping quote service

## Notes

- The application is configured to run on port 5001
- The backend API is expected to be running on port 3000