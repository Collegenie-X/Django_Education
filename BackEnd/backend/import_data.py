import csv
import os
import django
from decimal import Decimal
from accounts.models import User
from store.models import Problem, UnitType, SectionType, PreviewImage

# Django 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # 실제 프로젝트 설정 경로로 변경
django.setup()

# 사용자 정보 가져오기
try:
    default_user = User.objects.get(username='StoreStudyOLA')
except User.DoesNotExist:
    raise Exception("해당 사용자를 찾을 수 없습니다.")

# CSV 파일 경로 설정
csv_file_path = 'aws_data.csv'

# S3 URL의 베이스 경로 (필요에 따라 변경)
S3_BASE_URL = 'https://studyola-main-dir.s3.us-east-2.amazonaws.com/'

# CSV 파일 읽기 및 데이터베이스에 저장
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)

    for row in reader:
        try:
            # 데이터 처리 및 변환
            title = row['title']
            description = row['description']

            # Subject, Type, Grade 처리
            subject = row['subject']
            type_ = row['type']
            grade = row['grade'] if row['grade'] else None  # 빈 문자열 처리

            # Difficulty 처리 (정수로 변환)
            difficulty = int(row['difficulty']) if row['difficulty'] else 1  # 기본값 1

            # Price 처리 (Decimal으로 변환)
            price = Decimal(row['price']) if row['price'] else Decimal('0.00')

            # is_free 처리 (문자열을 불리언으로 변환)
            is_free = row['is_free'].strip().lower() == 'true'

            # Pages와 Problems 처리 (정수로 변환)
            pages = int(row['pages']) if row['pages'] else 0
            problems_count = int(row['problems']) if row['problems'] else 0

            # 파일 URL 처리: S3 베이스 URL 제거
            file_url = row['file'].replace(S3_BASE_URL, '') if row['file'] else ''

            # Problem 객체 생성
            problem = Problem.objects.create(
                user=default_user,
                title=title,
                subject=subject,
                grade=grade,
                type=type_,
                price=price,
                is_free=is_free,
                pages=pages,
                problems=problems_count,
                description=description,
                difficulty=difficulty,
            )

            # FileField 처리: S3 상대 경로 할당
            if file_url:
                problem.file.name = file_url  # S3 상대 경로 할당
                problem.save()

            # PreviewImage 처리: S3 상대 경로 추출 후 할당
            preview_image_url = row['preview_image'].replace(S3_BASE_URL, '') if row['preview_image'] else ''
            if preview_image_url:
                preview_image = PreviewImage.objects.create(
                    problem=problem,
                    image=preview_image_url  # S3 상대 경로 할당
                )

            # ManyToMany 필드 처리: Unit
            unit_names = row.get('unit')  # CSV에 'unit' 컬럼이 있는지 확인
            if unit_names:
                units = [name.strip() for name in unit_names.split(',')]
                for unit_name in units:
                    unit, created = UnitType.objects.get_or_create(name=unit_name)
                    problem.unit.add(unit)

            # ManyToMany 필드 처리: Detailed Section
            section_names = row.get('detailed_section')  # CSV에 'detailed_section' 컬럼이 있는지 확인
            if section_names:
                sections = [name.strip() for name in section_names.split(',')]
                for section_name in sections:
                    section, created = SectionType.objects.get_or_create(name=section_name)
                    problem.detailed_section.add(section)

            # 문제 저장 (ManyToMany 필드 추가 후 저장)
            problem.save()

        except Exception as e:
            print(f"문제 생성 실패 (ID: {row.get('id')}): {e}")

print("CSV 데이터를 데이터베이스에 성공적으로 저장했습니다.")
