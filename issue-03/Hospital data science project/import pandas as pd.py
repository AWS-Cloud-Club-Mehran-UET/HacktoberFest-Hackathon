import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score, classification_report, precision_recall_curve, roc_curve
import matplotlib.pyplot as plt
from imblearn.over_sampling import SMOTE
import xgboost as xgb

# Load dataset
df = pd.read_csv('icu-apache-Subdiagnosis-codes-ANZICS.csv')

print(df.head())
print(df.info())
# Fill missing values (you can also use more advanced imputation techniques)
df.fillna(df.median(), inplace=True)

# One-hot encode categorical features
categorical_cols = ['gender', 'diagnosis_code']  # Replace with actual categorical columns
df = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

# Standardize numeric features (e.g., vital signs, lab results)
scaler = StandardScaler()
numeric_cols = ['age', 'blood_pressure', 'heart_rate']  # Replace with actual numeric columns
df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

# Create rolling average and trend features for vital signs
df['blood_pressure_avg'] = df['blood_pressure'].rolling(window=5, min_periods=1).mean()
df['heart_rate_avg'] = df['heart_rate'].rolling(window=5, min_periods=1).mean()

# Calculate changes over time (diff)
df['blood_pressure_change'] = df['blood_pressure'].diff()
df['heart_rate_change'] = df['heart_rate'].diff()

# Replace NaN values generated from diff() and rolling calculations
df.fillna(0, inplace=True)

X = df.drop('readmission', axis=1)  # Replace 'readmission' with your actual target column name
y = df['readmission']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

xgb_model = xgb.XGBClassifier(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
xgb_model.fit(X_train_resampled, y_train_resampled)

# Make predictions on test set
y_pred = xgb_model.predict(X_test)
y_pred_proba = xgb_model.predict_proba(X_test)[:, 1]

print("Classification Report:")
print(classification_report(y_test, y_pred))

# ROC-AUC Score
roc_auc = roc_auc_score(y_test, y_pred_proba)
print(f"ROC-AUC Score: {roc_auc:.2f}")

# ROC Curve
fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba)
plt.figure()
plt.plot(fpr, tpr, color='blue', lw=2)
plt.title('ROC Curve')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.show()
precision, recall, _ = precision_recall_curve(y_test, y_pred_proba)
plt.figure()
plt.plot(recall, precision, color='green', lw=2)
plt.title('Precision-Recall Curve')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.show()
xgb.plot_importance(xgb_model)
plt.show()

from sklearn.model_selection import GridSearchCV

# Define the parameter grid
param_grid = {
    'max_depth': [3, 5, 7],
    'n_estimators': [50, 100, 200],
    'learning_rate': [0.01, 0.1, 0.2]
}

# Perform grid search
grid_search = GridSearchCV(estimator=xgb_model, param_grid=param_grid, cv=3, scoring='roc_auc')
grid_search.fit(X_train_resampled, y_train_resampled)

print(f"Best parameters: {grid_search.best_params_}")
best_model = grid_search.best_estimator_
y_best_pred = best_model.predict(X_test)
print("Best Model Classification Report:")
print(classification_report(y_test, y_best_pred))


