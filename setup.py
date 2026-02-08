from setuptools import setup, find_packages

setup(
    name="change_point_analysis",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "pandas",
        "numpy",
        "matplotlib",
        "seaborn",
        "statsmodels",
    ],
)
