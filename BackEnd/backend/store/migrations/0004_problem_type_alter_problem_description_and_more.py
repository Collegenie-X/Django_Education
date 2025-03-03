# Generated by Django 4.2.9 on 2024-08-01 03:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import store.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0003_problem_updated_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='type',
            field=models.CharField(choices=[('Multiple Choice', 'Multiple Choice'), ('Short Answer', 'Short Answer'), ('Mathematical Modeling', 'Mathematical Modeling'), ('Learning Through Discussion', 'Learning Through Discussion'), ('STEAM', 'STEAM'), ('Math Puzzle', 'Math Puzzle'), ('Math for Literacy', 'Math for Literacy')], default='Short Answer', help_text='* required', max_length=30),
        ),
        migrations.AlterField(
            model_name='problem',
            name='description',
            field=models.TextField(help_text='* required'),
        ),
        migrations.AlterField(
            model_name='problem',
            name='difficulty',
            field=models.IntegerField(choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')], default=1, help_text='* required'),
        ),
        migrations.AlterField(
            model_name='problem',
            name='file',
            field=models.FileField(help_text='* required', upload_to=store.models.get_file_upload_path),
        ),
        migrations.AlterField(
            model_name='problem',
            name='grade',
            field=models.CharField(choices=[('Kindergarten', 'Kindergarten'), ('USA grade 1', 'USA grade 1'), ('USA grade 2', 'USA grade 2'), ('USA grade 3', 'USA grade 3'), ('USA grade 4', 'USA grade 4'), ('USA grade 5', 'USA grade 5'), ('USA grade 6', 'USA grade 6'), ('USA grade 7', 'USA grade 7'), ('USA grade 8', 'USA grade 8'), ('Algebra 1', 'Algebra 1'), ('Geometry', 'Geometry'), ('Algebra 2', 'Algebra 2'), ('Trigonometry', 'Trigonometry'), ('Precalculus', 'Precalculus'), ('High school statistics', 'High school statistics'), ('Statistics and probability', 'Statistics and probability'), ('Linear algebra', 'Linear algebra'), ('Differential equations', 'Differential equations'), ('Multivariable calculus', 'Multivariable calculus'), ('AP Calculus BC', 'AP Calculus BC'), ('AP Calculus AB', 'AP Calculus AB'), ('AP Statistics', 'AP Statistics')], help_text='* required', max_length=100),
        ),
        migrations.AlterField(
            model_name='problem',
            name='pages',
            field=models.IntegerField(help_text='* PDF (Pages number)'),
        ),
        migrations.AlterField(
            model_name='problem',
            name='preview_image',
            field=models.ImageField(blank=True, default='', help_text='600 X 800 jpg, png 이미지만 올릴 수 있습니다.', null=True, upload_to=store.models.get_image_upload_path),
        ),
        migrations.AlterField(
            model_name='problem',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='달러 기준이며, $5 ~ $300 사이에서 입력해야 합니다.', max_digits=5),
        ),
        migrations.AlterField(
            model_name='problem',
            name='problems',
            field=models.IntegerField(help_text='* PDF (Problem Numbers)'),
        ),
        migrations.AlterField(
            model_name='problem',
            name='subject',
            field=models.CharField(choices=[('Math', 'Math'), ('Science', 'Science'), ('Liberal Arts', 'Liberal Arts'), ('English', 'English'), ('STEM', 'STEM'), ('SAT', 'SAT')], help_text='* required', max_length=20),
        ),
        migrations.AlterField(
            model_name='problem',
            name='title',
            field=models.CharField(help_text='* required', max_length=200),
        ),
        migrations.AlterField(
            model_name='problem',
            name='user',
            field=models.ForeignKey(help_text='* required', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
