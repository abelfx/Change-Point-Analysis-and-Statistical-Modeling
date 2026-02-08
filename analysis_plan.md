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
5.  **Reporting**: Visualize results in a dashboard and summarize findings for stakeholders across different channels.

## 3. Key Events Dataset
The analysis focuses on the following key historical events to correlate with detected change points:

| Event | Date | Type | Description |
| :--- | :--- | :--- | :--- |
| **Gulf War** | 1990-08-02 | Conflict | Iraq invades Kuwait, leading to a spike in oil prices due to supply fears. |
### Limitations & Stakeholder Impact
*   **Causality vs. Correlation**: Detecting a change point near a known event shows correlation, not necessarily direct causation. Other confounding variables could be at play.
    *   *Impact*: Policymakers must be cautious not to attribute price stability solely to a specific policy intervention without considering external market factors.
*   **Lag Effects**: Market reactions to news can be delayed or anticipatory. A change point might not align perfectly with an event date.
    *   *Impact*: Investors trading on immediate news might miss the structural break that occurs days or weeks later as the market digests the full implications.
*   **Model Complexity**: Capturing all market nuances (seasonality, micro-structure) in a single change point model is difficult. We focus on major structural shifts.
    *   *Impact*: Energy companies should use this model for strategic, long-term planning (quarterly/yearly) rather than daily operational hedging, as high-frequency noise is not the model's focus.

## 6. EDA Findings (Preliminary)
*   **Trend**: The data shows an overall upward trend but with significant fluctuations (non-linear).h OPEC refusal to cut output. |
| **Iran Nuclear Deal (JCPOA)** | 2015-07-14 | Political | Agreement lifting sanctions on Iran, allowing more oil onto the global market. |
| **OPEC+ Formation** | 2016-12-10 | Policy | OPEC and non-OPEC members (led by Russia) agree to cut production to stabilize prices. |
| **US-China Trade War** | 2018-07-06 | Economic | Tariffs and trade tensions dampening global economic growth outlook and oil demand. |
| **COVID-19 Pandemic** | 2020-03-11 | Health/Economic | WHO declares pandemic; global lockdowns cause unprecedented demand collapse. |
| **Russia-Saudi Price War** | 2020-03-08 | Policy | Brief price war after disagreement on production cuts, leading to negative futures prices. |
| **Post-COVID Recovery** | 2021-01-01 | Economic | Global economies reopening leading to demand outstripping supply. |
| **Russia-Ukraine War** | 2022-02-24 | Conflict | Invasion of Ukraine leading to sanctions on Russia and fears of energy supply crises. |

## 4. Communication Strategy
To ensure insights are actionable, we define specific communication channels for our primary stakeholders:

### **1. Investors & Analysts**
*   **Focus**: Risk management, return maximization, and market timing.
*   **Channel**: Interactive Streamlit/Dash Dashboard.
*   **Format**: Real-time visualization of volatility probability, "Regime Change" alerts, and downloadable quantitative metrics (CSV/Excel).
*   **Key Insight**: Probability of future volatility regimes based on current geopolitical indicators.

### **2. Policymakers**
*   **Focus**: Economic stability, energy security, and impact analysis of regulations.
*   **Channel**: Executive Policy Briefing (PDF Report).
*   **Format**: High-level summary focusing on the causality of past policy interventions (e.g., Sanctions, OPEC+ decisions) and their quantifiable impact on price stability.
*   **Key Insight**: Historical effectiveness of policy measures in stabilizing markets.

### **3. Energy Companies**
*   **Focus**: Operational planning, cost control, and supply chain security.
*   **Channel**: Quarterly Strategy Presentation.
*   **Format**: Slide deck highlighting long-term structural trends and potential "shock" scenarios derived from the model.
*   **Key Insight**: Identification of sustained price floors or ceilings established by new market regimes (e.g., Post-Shale revolution).

## 5. Assumptions and Limitations
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
## 7. Expected Outputs
*   **Dates of Change**: Probability distributions for when structural changes occurred.lity periods follow high-volatility periods (heteroskedasticity).

## 5. Expected Outputs
*   **Dates of Change**: Probability distributions for when structural changes occurred.
*   **Regime Parameters**: Average price and volatility levels before and after each change.
*   **Impact Assessment**: A quantified measure of how much price behavior shifted during key historical periods.
