 
 ### 가상환경 셋팅 
 > -  python3.13 -m venv venv
 > -  source venv/bin/activate

 
 > - Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
 > - \venv\Scripts\activate
 
 ### pip 설치 
 > -  pip install django
 > -  pip install djangorestframework
 > -  pip install markdown
 > -  pip install django-filter

 ### 앱 제작 부분 
 > -  mkdir TodoList
 > -  cd TodoList
 > -  django-admin startproject config .
 > -  python manage.py startapp todo
 
 
 ### 실행 부분 
 > -  python manage.py makemigrations 
 > -  python manage.py migrate
 > -  python manage.py runserver 


 ### admin user 제작 
 > - python manage.py createsuperuser

 ```
 id : jp798
 pw : 1234

 (venv) django-pythonkimjongphil@kimjongphilui-Mac-Studio TodoList % python manage.py createsuperuser
    Username (leave blank to use 'kimjongphil'):jp798
    Email address: abc@abc.com
    Password: 
    Password (again): 
    This password is too short. It must contain at least 8 characters.
    This password is too common.
    This password is entirely numeric.
    Bypass password validation and create user anyway? [y/N]: y
    Superuser created successfully.
```



################################################################
> ### 1) 모든 Todo 목록 조회
```
curl -X GET http://127.0.0.1:8000/api/v1/todos/
-H "Authorization: Bearer <ACCESS_TOKEN>"
```

### 2) 새 Todo 작성 (POST)
```
curl -X POST http://127.0.0.1:8000/api/v1/todos/ \     
     -H "Content-Type: application/json" \    
     -H "Authorization: Bearer <ACCESS_TOKEN>" 
     -d '{
           "title": "테스트 할 일",
           "description": "테스트 상세내용",
           "priority": 3,
           "is_done": false
         }'
```
### 3) 특정 Todo 조회 (GET)
```
curl -X GET http://127.0.0.1:8000/api/v1/todos/1/
```

### 4) Todo 부분 수정 (PATCH)
```
curl -X PATCH http://127.0.0.1:8000/api/v1/todos/1/ \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <ACCESS_TOKEN>"
     -d '{"is_done": true}'
```
### 5) Todo 삭제 (DELETE)
```
curl -X DELETE http://127.0.0.1:8000/api/v1/todos/1/
```
################################################################



### 마이그레이션 파일 존재 여부 
python manage.py makemigrations todo


### 회원 가입 
```
curl -X POST http://127.0.0.1:8000/api/v1/signup/ \
  -H "Content-Type: application/json" \

  -d '{
        "email": "user@example.com",
        "password": "12345678"
      }'

{
  "message": "User created successfully",
  "access": "eyJhbGc..",   // JWT Access Token
  "refresh": "eyJhbGci..." // JWT Refresh Token
}
```

### 로그인 
```
curl -X POST http://127.0.0.1:8000/api/v1/login/ \
  -H "Content-Type: application/json" \
  -d '{
        "email": "user@example.com",
        "password": "12345678"
      }'

{
  "message": "Login successful",
  "access": "eyJhbGc..",   // JWT Access Token
  "refresh": "eyJhbGci..." // JWT Refresh Token
}
```

### 토큰 발급 (Simple JWT 기본)
'''
curl -X POST http://127.0.0.1:8000/api/v1/token/ \
  -H "Content-Type: application/json" \  
  -d '{
        "email": "user@example.com",
        "password": "12345678"
      }'

'''

### 토큰 재발급 
```
curl -X POST http://127.0.0.1:8000/api/v1/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{
        "refresh": "eyJhbGciOiJIUz..."
      }'
```

### 토큰 유효성 검사 
```
curl -X POST http://127.0.0.1:8000/api/v1/token/verify/ \
  -H "Content-Type: application/json" \
  -d '{
        "token": "<ACCESS_TOKEN>"
      }'
```


 python manage.py createsuperuser 
 
 admin@abc.com
 1234

