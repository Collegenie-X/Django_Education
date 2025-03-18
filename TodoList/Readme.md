 
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
curl -X GET http://127.0.0.1:8000/api/todos/
```

### 2) 새 Todo 작성 (POST)
```
curl -X POST http://127.0.0.1:8000/api/todos/ \     
     -H "Content-Type: application/json" \     
     -d '{
           "title": "테스트 할 일",
           "description": "테스트 상세내용",
           "priority": 3,
           "is_done": false
         }'
```
### 3) 특정 Todo 조회 (GET)
```
curl -X GET http://127.0.0.1:8000/api/todos/1/
```

### 4) Todo 부분 수정 (PATCH)
```
curl -X PATCH http://127.0.0.1:8000/api/todos/1/ \
     -H "Content-Type: application/json" \
     -d '{"is_done": true}'
```
### 5) Todo 삭제 (DELETE)
```
curl -X DELETE http://127.0.0.1:8000/api/todos/1/
```
################################################################


 python manage.py createsuperuser 
 
 admin@abc.com
 1234