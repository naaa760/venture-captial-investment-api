# Cueball Capital Investment Validation System

This Node.js application implements an investment validation system for Cueball Capital, helping them regulate their investments according to specific budget rules.

## Features

- SQLite database for storing budget rules and investments
- RESTful APIs for accessing and analyzing investment data
- Investment validation against budget rules
- Sorting and filtering capabilities

## API Endpoints

### Budget Rules

- `GET /api/budget-rules` - List all budget rules

### Investments

- `GET /api/investments` - List all investments
  - Query params:
    - `sort=date` - Sort investments by date
- `GET /api/investments/valid` - List investments that pass budget rules
- `GET /api/investments/invalid` - List investments that violate budget rules

## Setup and Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

3. The server will start on port 3000 (or the port specified in the PORT environment variable)

## Database

The application uses SQLite for data storage. The database file (`cueball.db`) will be created automatically when you start the server. The initial data is loaded from the CSV files in the `src/data` directory.

## Testing

Run the tests using:

```bash
npm test
```

## Data Structure

### Budget Rules

- ID: Unique identifier
- Amount: Maximum investment amount in millions USD
- Time Period: 'Month', 'Quarter', or 'Year'
- Sector: Investment sector (optional)

### Investments

- ID: Unique identifier
- Date: Investment date (DD/MM/YYYY)
- Amount: Investment amount in millions USD
- Sector: Investment sector
