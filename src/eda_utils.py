from statsmodels.tsa.stattools import adfuller

def check_stationarity(series, name="Series"):
    """
    Performs the Augmented Dickey-Fuller (ADF) test to check for stationarity.
    
    Args:
        series (pd.Series): The time series data to test.
        name (str): The name of the series (for display purposes).
    """
    print(f"--- ADF Test for {name} ---")
    result = adfuller(series.dropna())
    print('ADF Statistic: %f' % result[0])
    print('p-value: %f' % result[1])
    if result[1] <= 0.05:
        print("Result: Stationary (Reject H0)")
    else:
        print("Result: Non-Stationary (Fail to reject H0)")
