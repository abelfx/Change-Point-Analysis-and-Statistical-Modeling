# Change Point Analysis and Statistical Modeling of Time Series Data

## Overview
This project focuses on detecting change points in Brent oil prices (1987-2022) to understand how major geopolitical and economic events influence market volatility and trends. Utilizing Bayesian statistical modeling (PyMC), the analysis aims to quantify the impact of events like conflicts, sanctions, and policy changes on oil prices.

## Business Need
Investors, policymakers, and energy companies require accurate insights into market stability to manage risks and plan operations. This project provides data-driven evidence connecting historical events to structural breaks in oil price time series.

## Project Structure
```
├── data/
│   ├── BrentOilPrices.csv    # Historical daily Brent oil prices
│   └── key_events.csv        # Compiled list of major geopolitical/economic events
├── notebooks/
│   └── eda_analysis.ipynb    # Exploratory Data Analysis notebook
├── src/
│   ├── data_loader.py        # Data loading utilities
│   └── eda_utils.py          # EDA helper functions (e.g., stationarity tests)
├── analysis_plan.md          # Detailed analysis workflow and methodology
└── README.md                 # Project documentation
```

## Methodology
The analysis follows a structured five-step workflow:
1.  **Data Preprocessing**: Cleaning and parsing daily price data.
2.  **Exploratory Data Analysis (EDA)**: Examining trends, stationarity (ADF test), and volatility clustering.
3.  **Bayesian Change Point Detection**: Using PyMC to model structural breaks in price mean and variance.
4.  **Event Association**: Correlating statistically significant change points with known historical events.
5.  **Impact Quantification**: Measuring the magnitude of price shifts pre- and post-event.

## Setup and Installation

### Prerequisites
- Python 3.8+
- pip (Python package installer)

### Quick Start
To set up the project environment and run the analysis, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/abelfx/Change-Point-Analysis-and-Statistical-Modeling-.git
    cd Change-Point-Analysis-and-Statistical-Modeling-
    ```

2.  **Create and activate a virtual environment** (recommended):
    ```bash
    # Linux/Mac
    python3 -m venv venv
    source venv/bin/activate
    
    # Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Install the project package (editable mode)**:
    This ensures imports like `from src import data_loader` work correctly in notebooks without path hacks.
    ```bash
    pip install -e .
    ```

5.  **Run the analysis**:
    Launch Jupyter Lab or Notebook to view the analysis.
    ```bash
    jupyter lab notebooks/eda_analysis.ipynb
    ```

## Development & Testing
To run the analysis scripts directly or perform tests:
```bash
# Run EDA script (if available)
python src/eda_analysis.py

# Run tests (placeholder)
python -m unittest discover tests
```

## Key Deliverables
- **EDA Notebook**: Visualizations of price trends and volatility.
- **Change Point Model**: Bayesian inference of structural breaks.
- **Event Impact Report**: Analysis linking market shifts to real-world events.

## License
[MIT License](LICENSE)
