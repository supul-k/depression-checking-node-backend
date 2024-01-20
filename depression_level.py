import nltk
import pickle
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.text import one_hot
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import model_from_json

import re
import pickle

json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("model.h5")

chat_history = ['im sorry', 'my bad']

def depression_level(chat_history):
    
    chat_values = []
    for chat_text in chat_history:
        w=WordNetLemmatizer()
        chat_text=re.sub('[^a-zA-Z]', ' ', chat_text)
        chat_text=chat_text.lower()
        chat_text=chat_text.split()
        chat_text=[w.lemmatize(word) for word in chat_text if not word in set(stopwords.words("english"))]

        voc_size=18611
        onehot_repr1=[one_hot(words,voc_size)for words in chat_text]

        max=0
        for i in onehot_repr1:
            if len(i)>max:
                max=len(i)

        sent_length=max
        embedded_docs1=pad_sequences(onehot_repr1,padding='pre',maxlen=sent_length)

        Y_pred = loaded_model.predict(embedded_docs1)
        chat_values.extend(Y_pred)
    level = 0
    length = len(chat_values)
    for i in chat_values:
        level+= i
    return level/length*100
    
print(depression_level(chat_history))

