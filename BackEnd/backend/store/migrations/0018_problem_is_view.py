# Generated by Django 4.2.9 on 2024-09-30 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0017_previewimage_image_url_alter_problem_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='is_view',
            field=models.BooleanField(default=True, help_text='비공개일때는 체크를 제거해 주세요.'),
        ),
    ]
