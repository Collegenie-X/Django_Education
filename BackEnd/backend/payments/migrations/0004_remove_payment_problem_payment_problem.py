# Generated by Django 4.2.9 on 2024-08-15 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_alter_problem_detailed_section_alter_problem_unit'),
        ('payments', '0003_payment_problem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='problem',
        ),
        migrations.AddField(
            model_name='payment',
            name='problem',
            field=models.ManyToManyField(blank=True, null=True, related_name='payments', to='store.problem'),
        ),
    ]
