# Predictive Maintenance for Industrial Machines

## Project Overview

This project aims to develop a predictive maintenance solution for industrial machines using a dataset that contains various sensor readings such as temperature, pressure, and vibration. The goal is to predict potential machine failures in advance, allowing for timely preventive maintenance, reducing downtime, and optimizing machine lifespan.

### Dataset

The dataset was sourced from Kaggle: [Predictive Maintenance for Industrial Machines](https://www.kaggle.com/datasets/kilanisikiru/maintenance-predictive-for-industrial-machines/data). It contains historical sensor readings from industrial machines with associated failure labels.

## Data Preprocessing

The dataset required significant preprocessing before building the model. The key steps in the preprocessing pipeline are as follows:

1. **Data Type Conversion**: 
   - One of the columns, which should have been in float format, was stored as strings. I resolved this issue by converting the string values into the correct float format.
   
2. **Handling Missing Values**: 
   - After identifying missing values in the dataset, I used appropriate imputation techniques to fill in the gaps without losing valuable information.

3. **Outlier Detection and Removal**:
   - Outliers were detected using the Interquartile Range (IQR) method. These outliers were removed to ensure the model was trained on clean, reliable data.

## Exploratory Data Analysis (EDA)

To gain insights from the data, several visualizations and charts were generated, which helped in understanding relationships between various features. These visualizations were useful in identifying trends, patterns, and correlations in the data.

## Addressing Data Imbalance

The target feature (indicating machine failure) was found to be imbalanced. To address this, I employed the **SMOTE (Synthetic Minority Over-sampling Technique)** method, which balanced the dataset and helped improve the model's performance on the minority class.

## Model Selection & Training

To determine the best model for the task, I used an approach that involved testing multiple algorithms. Once the most suitable model was identified, I checked its **cross-validation score** to ensure generalizability, and then proceeded to train the model.

The model achieved an **accuracy of 99.79%**, indicating excellent predictive power.

## Evaluation

After training the model, the following evaluation metrics were used:

- **Classification Report**: Provided a detailed breakdown of precision, recall, and F1-scores.
- **Confusion Matrix**: Gave a visual representation of true positives, false positives, true negatives, and false negatives.

## Challenges Faced

1. **Finding the Dataset**:
   - Initially, finding a suitable dataset for predictive maintenance was a challenge. After thorough research, I found a relevant dataset on Kaggle.
   
2. **Data Cleaning**:
   - One of the columns in the dataset was stored as strings, even though it contained float values. My initial attempts at converting the data failed, but I eventually found an alternative approach to resolve the issue. You can see the detailed solution in the provided `.ipynb` file.

## Conclusion

This project demonstrates how predictive maintenance solutions can be developed by preprocessing raw sensor data, handling data imbalance, and selecting an appropriate machine learning model. With an accuracy of 99.79%, the model is highly reliable for predicting potential machine failures, thus enabling timely maintenance and reducing downtime.

--- 

## Instructions

To run the project and reproduce the results, follow these steps:

1. Download the dataset from Kaggle [here](https://www.kaggle.com/datasets/kilanisikiru/maintenance-predictive-for-industrial-machines/data).
2. Ensure you have the necessary dependencies installed by running:
   ```bash
   pip install -r requirements.txt
   ```
3. Open the Jupyter notebook file (`maintenance_predictive.ipynb`) and execute the cells to preprocess the data, train the model, and view the evaluation results.

--- 

### Files Included

- `maintenance_predictive.ipynb`: The main Jupyter notebook containing all preprocessing steps, model training, and evaluation.
- `requirements.txt`: List of dependencies required to run the project.

