from langchain.llms import CTransformers
from langchain.embeddings import HuggingFaceEmbeddings
from langchain import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from langchain.llms import Replicate

from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

os.environ['REPLICATE_API_TOKEN'] = "r8_asnDDCzcnBcWXESbrgOfRypv7xEZJzz49SySj"

template = """Use the following pieces of information to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Context: {context}
Question: {question}
Only return the helpful answer below and nothing else.
Helpful answer:
"""

llm = Replicate(model = 'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
                    model_type='llama',
                    config={'max_new_tokens': 256, 'temperature': 0.01})

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'})

loader = PyPDFDirectoryLoader("data")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=64)
texts = text_splitter.split_documents(docs)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'})

db = Chroma.from_documents(texts, embeddings, persist_directory="db")

retriever = db.as_retriever(search_kwargs={'k': 2})

prompt = PromptTemplate(
    template=template,
    input_variables=['context', 'question'])
qa_llm = RetrievalQA.from_chain_type(llm=llm,
                                     chain_type='stuff',
                                     retriever=retriever,
                                     return_source_documents=True,
                                     chain_type_kwargs={'prompt': prompt})

prompt = "How is depression treated?"
output = qa_llm({'query': prompt})
print(output)
