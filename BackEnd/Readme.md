# STORE_StudyOLA_BE

## 프로젝트 개요

이 프로젝트는 Django 백엔드와 Next.js 프론트엔드로 구성된 스토어 애플리케이션입니다. 이 문서는 백엔드 부분에 대한 설정 및 실행 방법을 설명합니다.

## 요구 사항

- Python 3.9+
- Django 4.0+
- Gunicorn
- MySQL (선택 사항)
- 기타 필요 라이브러리 (`requirements.txt` 참고)

## 설치 및 설정

### 가상 환경 설정

가상 환경을 생성하고 활성화합니다.

```bash
python3.9 -m venv django-env
source django-env/bin/activate  # Windows의 경우: .\env\Scripts\activate


pip freeze > requirements.txt
pip install -r requirements.txt

#### DB
# 새로운 마이그레이션 파일 생성
python manage.py makemigrations
# 마이그레이션을 데이터베이스에 적용
python manage.py migrate

#### collectstatic (css 파일 모아주는 역할)
python manage.py collectstatic

##### 서버 실행
# 기본 개발 서버 실행 (포트 8000)
python manage.py runserver
python manage.py runserver 8080
python manage.py runserver 0.0.0.0:8000

# 기본 Gunicorn 명령어로 Django 애플리케이션 실행
gunicorn myproject.wsgi:application
gunicorn --workers 3 myproject.wsgi:application
gunicorn --daemon myproject.wsgi:application
gunicorn --bind 0.0.0.0:8000 backend.wsgi:application --daemon

> gunicorn --bind 0.0.0.0:8000 backend.wsgi:application --daemon

###  migrations
source django-env/bin/activate
python3 manage.py makemigrations store
python3 manage.py migrate


python manage.py startapp  payments /  reports / store / upload

```

##### sudo nano /etc/nginx/sites-available/default

```
server {
    listen 80;
    server_name 18.117.84.145;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files configuration (optional)
    location /static/ {
        alias /home/ubuntu/backend/static/;
    }

    location /media/ {
        alias /home/ubuntu/backend/media/;
    }
}
```

> sudo service nginx restart
> sudo service nginx status
> nginx.service - A high performance web server and a reverse proxy server

     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2024-08-08 05:09:49 UTC; 1min 15s ago
       Docs: man:nginx(8)
    Process: 2473 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited>
    Process: 2474 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=>

Main PID: 2476 (nginx)
Tasks: 3 (limit: 4574)
Memory: 3.4M
CPU: 34ms
CGroup: /system.slice/nginx.service
├─2476 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
├─2477 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" >
└─2478 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" >

Aug 08 05:09:49 ip-172-31-21-94 systemd[1]: Starting A high performance web server and a reverse p>
Aug 08 05:09:49 ip-172-31-21-94 systemd[1]: Started A high performance web server and a reverse

## aws_problems.csv 수출

> source /home/ubuntu/django-env/bin/activate
> (django-env) ubuntu@ip-172-31-21-94:~/STORE_StudyOLA_BE/backend$

> (django-env) ubuntu@ip-172-31-21-94:~/STORE_StudyOLA_BE/backend$ pwd
> /home/ubuntu/STORE_StudyOLA_BE/backend

> cd /home/ubuntu/STORE_StudyOLA_BE/backend
> python manage.py export_problems --output=aws_problems.csv

### Problem DB 이관하는 POST / put (http://localhost:8000/api/v1/store/problems/ )

curl -X PUT "http://localhost:8000/api/v1/store/problems/" \
 -H "Content-Length: 0" \
 -H "Host: <calculated when request is sent>" \
 -H "User-Agent: PostmanRuntime/7.42.0" \
 -H "Accept: _/_" \
 -H "Accept-Encoding: gzip, deflate, br" \
 -H "Connection: keep-alive"

{
"created_count": 386,
"created_titles": [
{
"id": 1,
"title": "Digital SAT Solutions (2 WEEK)",
"subject": "SAT",
"price": 2825.74
},
{
"id": 2,
"title": "Digital SAT Questions (3 WEEK)",
"subject": "SAT",
"price": 1412.87
},
],
"skipped_count": 19,
"skipped_titles": [
{
"id": 1,
"title": "Digital SAT Questions (1 WEEK)",
"subject": "SAT",
"price": 1412.87
},
{
"id": 2,
"title": "Digital SAT Solutions (1 WEEK)",
"subject": "SAT",
"price": 2825.74
},
],
"errors": []
}

name: Deploy to EC2

on:
push:
branches: - master

jobs:
deploy:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v2

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: 3.147.62.176
          username: ubuntu
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22
          script: |
            set -e
            echo "Cloning repository..."
            cd /home/ubuntu/STORE_StudyOLA_BE/backend/
            echo "Pulling latest changes..."
            git pull origin master
            echo "Installing dependencies..."
            source /home/ubuntu/django-env/bin/activate
            python3 manage.py makemigrations
            pthoon3 manage.py migrate
            echo "Collecting static files..."
            python3 manage.py collectstatic --no-input
            echo "Starting server..."
            pkill gunicorn
            gunicorn --bind 0.0.0.0:8000 backend.wsgi:application --daemon
