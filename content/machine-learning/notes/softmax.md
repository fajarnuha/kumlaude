---
title: Softmax Implementation
---

```python
# Author: Fajar UN

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

D = 4
K = 3
seed = np.random.seed(24)
df = pd.read_csv('iris.csv').sample(frac=1, random_state=seed)
label_cols = ['species_setosa', 'species_versicolor', 'species_virginica']


split_val = int(len(df) * 0.8)
X_train = (df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']][:split_val]).as_matrix()
X_val = (df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']][split_val:]).as_matrix()
y_train = (df['species'][:split_val]).astype('category').cat.codes
y_val = (df['species'][split_val:]).astype('category').cat.codes

#Train a Linear Classifier

# initialize parameters randomly

# initialize parameters randomly
h = 16 # size of hidden layer
W = 0.01 * np.random.randn(D,h)
b = np.zeros((1,h))
W2 = 0.01 * np.random.randn(h,K)
b2 = np.zeros((1,K))

# some hyperparameters
step_size = 1e-2
reg = 1e-3 # regularization strength

# gradient descent loop
err_training = []
err_validation = []
num_examples = X_train.shape[0]
num_val = X_val.shape[0]
for i in xrange(700):
  
  # evaluate class scores, [N x K]
  hidden_layer = np.maximum(0, np.dot(X_train, W) + b) # note, ReLU activation
  scores = np.dot(hidden_layer, W2) + b2
  
  # compute the class probabilities
  exp_scores = np.exp(scores)
  probs = exp_scores / np.sum(exp_scores, axis=1, keepdims=True) # [N x K]
  
  # compute the loss: average cross-entropy loss and regularization
  corect_logprobs = -np.log(probs[range(num_examples),y_train])
  data_loss = np.sum(corect_logprobs)/num_examples
  reg_loss = 0.5*reg*np.sum(W*W) + 0.5*reg*np.sum(W2*W2)
  loss = data_loss + reg_loss
  err_training.append(loss)
  if i % 100 == 0:
    print "iteration %d: loss %f" % (i, loss)    

  # compute the gradient on scores
  dscores = probs
  dscores[range(num_examples),y_train] -= 1
  dscores /= num_examples
  
  # backpropate the gradient to the parameters
  # first backprop into parameters W2 and b2
  dW2 = np.dot(hidden_layer.T, dscores)
  db2 = np.sum(dscores, axis=0, keepdims=True)
  # next backprop into hidden layer
  dhidden = np.dot(dscores, W2.T)
  # backprop the ReLU non-linearity
  dhidden[hidden_layer <= 0] = 0
  # finally into W,b
  dW = np.dot(X_train.T, dhidden)
  db = np.sum(dhidden, axis=0, keepdims=True)
  
  # add regularization gradient contribution
  dW2 += reg * W2
  dW += reg * W
  
  # perform a parameter update
  W += -step_size * dW
  b += -step_size * db
  W2 += -step_size * dW2
  b2 += -step_size * db2
  
  #evaluate training loss
  hidden_layer = np.maximum(0, np.dot(X_val, W) + b)
  scores = np.dot(hidden_layer, W2) + b2
  exp_scores = np.exp(scores)
  probs = exp_scores / np.sum(exp_scores, axis=1, keepdims=True) # [N x K]
  
  # compute the loss: average cross-entropy loss and regularization
  corect_logprobs = -np.log(probs[range(num_val),y_val])
  data_loss = np.sum(corect_logprobs)/num_val
  reg_loss = 0.5*reg*np.sum(W*W) + 0.5*reg*np.sum(W2*W2)
  loss = data_loss + reg_loss
  err_validation.append(loss)
 
plttrain = plt.plot(err_training, label='training_error')
pltval = plt.plot(err_validation, label='validation_error')
plt.legend(loc='upper right')
plt.show()
# evaluate training set accuracy
hidden_layer = np.maximum(0, np.dot(X_val, W) + b)
scores = np.dot(hidden_layer, W2) + b2
predicted_class = np.argmax(scores, axis=1)
print 'training accuracy: %.2f' % (np.mean(predicted_class == y_val))
```
