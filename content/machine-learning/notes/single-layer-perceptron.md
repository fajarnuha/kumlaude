---
title: Singel Layer Perceptron (SGD)
---

```python
# Author: Fajar U N

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def nonlin(x, deriv=False):
    if(deriv==True):
        return (x*(1-x))

    return 1/(1+np.exp(-x))

df = pd.get_dummies(pd.read_csv('iris.csv'), columns=['species']).sample(frac=1)
label_cols = ['species_setosa', 'species_versicolor', 'species_virginica']


split_val = int(len(df) * 0.8)
training_input = (df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']][:split_val]).as_matrix()
testing_input = (df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']][split_val:]).as_matrix()
training_output = (df[label_cols][:split_val]).as_matrix()
testing_output = (df[label_cols][split_val:]).as_matrix()

np.random.seed(1)
weights = 2*np.random.random((4,3)) - 1

learning_rate = 0.001

for i in xrange(90000):
    l0 = training_input
    l1 = nonlin(np.dot(l0,weights))
    error = l1 - training_output
    sum_error = np.sum(0.5*error**2, axis=1)

    if i%10000 == 0:
        print 'Error : ' + str(np.mean(sum_error))

    l1_delta = error * nonlin(l1, deriv=True)

    weights -= (learning_rate * l0.T.dot(l1_delta))

# Testing the network
l0 = testing_input
l1 = nonlin(np.dot(l0, weights))
l1max = np.max(l1, axis=1)
for i in range(len(l1)):
    for j in range(len(l1[i])):
        if l1max[i] == l1[i,j]:
            l1[i,j] = 1.0
        else :
            l1[i,j] = 0.0

print 'Accuracy : ' + str(np.sum(np.all(l1 == testing_output, axis=1))/float(len(testing_output)))
```