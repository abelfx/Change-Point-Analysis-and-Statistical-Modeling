# Brent Oil Price Analysis Dashboard

This is an interactive dashboard to visualize Brent Oil prices, structural breaks detected by Bayesian analysis, and their correlation with historical geopolitical events.

## Project Structure

- **backend/**: Flask API serving price data and analysis results.
- **frontend/**: React application with interactive charts.

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js & npm

### 1. Backend Setup

Open a terminal and navigate to the `dashboard/backend` directory:

```bash
cd dashboard/backend
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The server will run on `http://localhost:5000`.

### 2. Frontend Setup

Open a **new** terminal and navigate to the `dashboard/frontend` directory:

```bash
cd dashboard/frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Features

- **Interactive Chart**: Zoomable line chart of oil prices over time.
- **Event Highlighting**: Click on key historical events in the table to see them pinpointed on the chart.
- **Change Point Detection**: Visualizes the structural break identified by the Bayesian model.
- **KPI Metrics**: Displays current, average, min, and max prices.
