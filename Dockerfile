FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
WORKDIR /srv
COPY digital-underworld-v1.0.0-mvp.zip /tmp/source.zip
RUN unzip -q /tmp/source.zip -d /tmp/source \
 && cp -a /tmp/source/digital-underworld-v2/. /srv/ \
 && pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]
