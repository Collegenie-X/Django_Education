
### 환경 셋팅 

>  - python3.13 -m venv django-env
>  - source django-env/bin/activate
>  - .\python-env\Scripts\activate
>  - Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
>  - pip install -r requirements.txt
>
>  - cd backend
>  - python3 manage.py runserver 0.0.0.0:8000 

>  - python manage.py collectstatic
>  - python manage.py makemigrations 
>  - python manage.py migrate   

```
https://www.teacherspayteachers.com/
```

### Github desktoptop Setup download 
https://drive.google.com/file/d/12b-jwVJU9wIZYVHCrRUU2_6DlD7Q4MjZ/view?usp=sharing


#### makemigrations
```
> python manage.py makemigrations downloads
Migrations for 'downloads':
  downloads/migrations/0001_initial.py
    + Create model Download
> python manage.py migrate   
Operations to perform:
  Apply all migrations: accounts, admin, auth, carts, contenttypes, downloads, payments, popups, reports, reviews, sessions, store, token_blacklist
```

> brew install nvm

```
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/etc/bash_completion" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion"' >> ~/.zshrc

source ~/.zshrc
```

> - nvm install --lts
> - nvm install v19 
> - nvm list 
> - nvm use --lts
> - nvm alias default node




### requirements.txt 

> - amqp
> - asgiref
> - billiard
> - boto3
> - botocore
> - CacheControl
> - cachetools
> - celery
> - certifi
> - cffi
> - charset-normalizer
> - click
> - click-didyoumean
> - click-plugins
> - click-repl
> - cryptography
> - Django
> - django-celery
> - django-filter
> - django-multiselectfield
> - django-ses
> - django-storages
> - djangorestframework
> - djangorestframework_simplejwt
> - firebase-admin
> - google-api-core
> - google-api-python-client
> - google-auth
> - google-auth-httplib2
> - google-cloud-core
> - google-cloud-firestore
> - google-cloud-storage
> - google-crc32c
> - google-resumable-media
> - googleapis-common-protos
> - grpcio
> - grpcio-status
> - gunicorn
> - h11
> - httpcore
> - httplib2
> - idna
> - jmespath
> - kombu
> - msgpack
> - numpy
> - packaging
> - pandas
> - pillow
> - prompt_toolkit
> - proto-plus
> - protobuf
> - pyasn1
> - pyasn1_modules
> - pycparser
> - PyJWT
> - pyparsing
> - python-dateutil
> - python-dotenv
> - pytz
> - requests
> - rsa
> - s3transfer
> - six
> - sqlparse
> - typing_extensions
> - tzdata
> - uritemplate
> - urllib3
> - vine
> - wcwidth
> - django-admin-logs
> - django-rangefilter

