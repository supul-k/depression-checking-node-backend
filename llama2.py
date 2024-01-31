import os
import sys

from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter

os.environ['REPLICATE_API_TOKEN'] = "r8_40bwJnW0pdfP1QabLGPI6UvGPRxRaEu3LldvB"

loader = PyPDFDirectoryLoader("data")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=64)
texts = text_splitter.split_documents(docs)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'})

db = Chroma.from_documents(texts, embeddings, persist_directory="db")
