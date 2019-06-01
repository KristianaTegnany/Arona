FROM python:3.6.0
LABEL maintainer="Arona Developers <aronabot.developers@gmail.com>"
LABEL version="0.1.0"
# -----------------------------------------------------------------------------

# Declare WORKDIR
WORKDIR /app

# COPY depedency file
COPY requirements.txt /app/requirements.txt

# COPY app folder to contain default contents
COPY . /app/

# Install dependencies
RUN pip install -U pip && pip install -r /app/requirements.txt

EXPOSE 8080

CMD python3 app.py
