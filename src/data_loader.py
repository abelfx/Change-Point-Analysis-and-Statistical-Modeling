import pandas as pd

def load_data(file_path):
    """
    Loads the Brent Oil Prices dataset from a CSV file.
    
    Args:
        file_path (str): The path to the CSV file.
        
    Returns:
        pd.DataFrame: The loaded DataFrame with 'Date' as the index.
    """
    try:
        df = pd.read_csv(file_path)
        # Handle mixed date formats (e.g., '20-May-87' and 'Apr 22, 2020')
        df['Date'] = pd.to_datetime(df['Date'], format='mixed')
        df = df.sort_values('Date')
        df = df.set_index('Date')
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return None
