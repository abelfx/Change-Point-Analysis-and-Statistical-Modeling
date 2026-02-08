# Analysis Plan: Brent Oil Prices Change Point Analysis

## 1. Introduction
This project aims to detect and analyze change points in Brent oil prices from 1987 to 2022, understanding how major geopolitical and economic events influence market volatility and trends.

## 2. Methodology & Workflow
### Data Analysis Workflow
1.  **Data Loading & Cleaning**: Load `data/BrentOilPrices.csv`, parse dates, sort chronologically, and handle any missing values.
2.  **Exploratory Data Analysis (EDA)**:
    *   **Trend Analysis**: Identify long-term directions (upward/downward).
    *   **Stationarity Testing**: Use Augmented Dickey-Fuller (ADF) tests to check if the series statistical properties (mean, variance) are constant over time.
    *   **Volatility Analysis**: Calculate rolling standard deviations to spot periods of high instability.
3.  **Bayesian Change Point Detection**:
    *   Use **PyMC** to model the time series.
    *   Implement models that assume prices or volatility follow specific distributions (e.g., Normal, Student-t) with parameters that change at discrete points in time.
    *   Use MCMC (Markov Chain Monte Carlo) to infer the posterior distributions of change points and parameters.
4.  **Event Association**:
    *   Correlate detected change points with the compiled list of events in `data/key_events.csv`.
    *   Quantify the impact (magnitude of change) associated with these events.
5.  **Reporting**: Visualize results in a dashboard and summarize findings for stakeholders.

## 3. Assumptions and Limitations
### Assumptions
*   **Data Accuracy**: We assume the provided Brent oil price dataset is accurate and representative of the global market.
*   **Structural Breaks**: We assume that significant market shifts manifest as sharp changes (change points) in the statistical parameters (mean or variance) of the time series.
*   **Independence**: Simple models may assume daily returns are independent, though time series often exhibit autocorrelation (which we may need to model).

### Limitations
*   **Causality vs. Correlation**: Detecting a change point near a known event shows correlation, not necessarily direct causation. Other confounding variables could be at play.
*   **Lag Effects**: Market reactions to news can be delayed or anticipatory. A change point might not align perfectly with an event date.
*   **Model Complexity**: Capturing all market nuances (seasonality, micro-structure) in a single change point model is difficult. We focus on major structural shifts.

## 4. EDA Findings (Preliminary)
*   **Trend**: The data shows an overall upward trend but with significant fluctuations (non-linear).
*   **Stationarity**: Raw prices are likely non-stationary (mean changes over time). However, daily returns (first differences) are expected to be stationary.
*   **Volatility**: Volatility is not constant; it exhibits clustering where high-volatility periods follow high-volatility periods (heteroskedasticity).

## 5. Expected Outputs
*   **Dates of Change**: Probability distributions for when structural changes occurred.
*   **Regime Parameters**: Average price and volatility levels before and after each change.
*   **Impact Assessment**: A quantified measure of how much price behavior shifted during key historical periods.
