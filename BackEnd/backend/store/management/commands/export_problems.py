# store/management/commands/export_problems.py

import csv
from django.core.management.base import BaseCommand
from store.models import Problem
from accounts.models import User

class Command(BaseCommand):
    help = 'Export all Problem instances to a CSV file.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            type=str,
            help='The file path where the CSV will be saved.',
            default='aws_problems.csv'
        )

    def handle(self, *args, **options):
        output_file = options['output']

        # Define the CSV headers
        headers = [
            "id",
            "user",                      
            "subject",
            "type",
            "grade",
            "unit",
            "detailed_section",
            "difficulty",
            "title",
            "description",
            "price",
            "is_free",
            "pages",
            "problems",
            "preview_image",
            "file",
            "updated_date",
            "created_date"
        ]

        # Open the CSV file for writing
        with open(output_file, mode='w', encoding='utf-8', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=headers)
            writer.writeheader()

            # Fetch all Problem instances
            problems = Problem.objects.all()

            for problem in problems:
                writer.writerow({   
                    "id": problem.id,
                    "user" : problem.user,                                     
                    "subject": problem.subject,
                    "type": problem.type,
                    "grade": problem.grade if problem.grade else "",
                    "unit": problem.unit if problem.unit else "None",
                    "detailed_section": problem.detailed_section if problem.detailed_section else "None",
                    "difficulty": problem.difficulty,
                    "title": problem.title,
                    "description": problem.description,
                    "price": str(problem.price),
                    "is_free": problem.is_free,
                    "pages": problem.pages,
                    "problems": problem.problems,
                    "preview_image": self.get_file_url(problem.preview_image),
                    "file": self.get_file_url(problem.file),
                    "updated_date": problem.updated_date.isoformat(),
                    "created_date": problem.created_date.isoformat(),
                })

        self.stdout.write(self.style.SUCCESS(f"CSV 파일이 성공적으로 생성되었습니다: {output_file}"))

    def get_file_url(self, file_field):
        if file_field and file_field.url:
            return file_field.url
        return ""
