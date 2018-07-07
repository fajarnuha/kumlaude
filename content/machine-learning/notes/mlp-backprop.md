---
title: Multil Layer Perceptron (Back Propagation)
---

```python
# Author: Fajar UN

import pandas as pd
import numpy as np
from sklearn.model_selection import KFold

def sigmoid(x, deriv=False):
    if(deriv==True):
        return (x*(1-x))

    return 1/(1+np.exp(-x))

# Pre Process
df = pd.get_dummies(pd.read_csv('iris.csv'), columns=['species']).sample(frac=1)
#df['bias'] = np.ones((150, ))
label_cols = ['species_setosa', 'species_versicolor', 'species_virginica']
features_cols = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']

# Binary Encoding
y = []
argmax_label = np.argmax((df[label_cols]).as_matrix(), axis=1)
for i in argmax_label:
    if i == 0 : 
        y.append([0.,0.])
    elif i == 1:
        y.append([0.,1.])
    elif i == 2:
        y.append([1.,0.])

y = np.array(y)

# Initialize
# Hyper Parameter
learning_rate = [0.01]
batch_size = 1
epoch = 501
hidden_neuron = [8]

def traintest(epoch, batch_size, learning_rate, hidden_neuron):
    
    kf = KFold(n_splits=5)
    acc = 0
    err = []
    for train_index, test_index in kf.split((df[features_cols]).as_matrix()):
        training_input, testing_input = (df[features_cols].as_matrix())[train_index], (df[features_cols].as_matrix())[test_index]
        training_output, testing_output = y[train_index], y[test_index]
    
        np.random.seed(1)
        w1 = 2*np.random.random((5,hidden_neuron)) - 1
        w2 = 2*np.random.random((hidden_neuron+1,2)) - 1
        
        row_error = []
        for i in xrange(epoch):
            for j in xrange(0,len(training_input), batch_size):
                l0 = training_input[j:j+batch_size] 
                #add biases
                l0 = np.concatenate((l0, np.ones((len(l0),1))), axis=1)
                l1 = sigmoid(np.dot(l0,w1))
                #add biases
                l1b = np.concatenate((l1, np.ones((len(l1),1))), axis=1)
                l2 = sigmoid(np.dot(l1b, w2))
                error = training_output[j:j+batch_size] - l2
        
                l2_delta = error * sigmoid(l2, deriv=True)
                l1_error = l2_delta.dot(w2[:-1,:].T)
                
                l1_delta = l1_error * sigmoid(l1,deriv=True)
                w2 += (learning_rate * l1b.T.dot(l2_delta))
                w1 += (learning_rate * l0.T.dot(l1_delta))
            if i%10 == 0:
                l0 = training_input
                l0 = np.concatenate((l0, np.ones((len(l0),1))), axis=1)
                l1 = sigmoid(np.dot(l0,w1))
                l1 = np.concatenate((l1, np.ones((len(l1),1))), axis=1)
                l2 = sigmoid(np.dot(l1, w2))
                error = training_output - l2
                sum_error = np.sum(0.5*error**2, axis=1)
#                print 'Error : ' + str(np.mean(sum_error))
                row_error.append(np.mean(sum_error))
        
        err.append(row_error)
        # Testing the network
        l0 = testing_input
        l0 = np.concatenate((l0, np.ones((len(l0),1))), axis=1)
        l1 = sigmoid(np.dot(l0, w1))
        l1 = np.concatenate((l1, np.ones((len(l1),1))), axis=1)
        l2 = sigmoid(np.dot(l1, w2))
        
        for i in range(len(l2)):
            for j in range(len(l2[i])):
                if l2[i][j] <= 0.5 : 
                    l2[i][j] = 0.0
                else : 
                    l2[i][j] = 1.0
        print np.sum(np.all(l2 == testing_output, axis=1))/float(len(testing_output))
        acc += np.sum(np.all(l2 == testing_output, axis=1))/float(len(testing_output))
        
    acc_mean = acc/5.0
#    print acc_mean
    return acc_mean, err


import matplotlib.pyplot as plt
res = []
for h in hidden_neuron:
    row_result = []
    for l in learning_rate:
        result, err = traintest(epoch, batch_size, l, h)
        row_result.append(result)
        print 'hidden : ' + str(h), 'learning rate : ' + str(l)
        plt.plot( range(0,501,10),np.mean(np.array(err), axis=0), '-')
        plt.xlabel('epoch')
        plt.ylabel('error')
        plt.show()
    res.append(row_result)

df_result = pd.DataFrame(res, index=hidden_neuron, columns=learning_rate)
```