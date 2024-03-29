# 
FROM python:3.11-alpine

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./backend /code/backend

EXPOSE 443

# 
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "443"]
