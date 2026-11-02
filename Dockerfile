FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
WORKDIR /srv
COPY digital-underworld-v1.0.0-mvp.zip /tmp/source.zip
RUN unzip -q /tmp/source.zip -d /tmp/source \
 && cp -a /tmp/source/digital-underworld-v2/. /srv/ \
 && rm -rf /tmp/source /tmp/source.zip
COPY app/admin_routes.py /srv/app/admin_routes.py
COPY app/apply_admin_patch.py /srv/app/apply_admin_patch.py
COPY app/bootstrap_admin.py /srv/app/bootstrap_admin.py
COPY static/admin.html /srv/static/admin.html
COPY static/admin.css /srv/static/admin.css
COPY static/admin.js /srv/static/admin.js
RUN python app/apply_admin_patch.py && pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]
