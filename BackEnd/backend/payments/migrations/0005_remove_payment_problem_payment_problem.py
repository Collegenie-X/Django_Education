# Generated by Django 4.2.9 on 2024-08-15 09:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_alter_problem_detailed_section_alter_problem_unit'),
        ('payments', '0004_remove_payment_problem_payment_problem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='problem',
        ),
        migrations.AddField(
            model_name='payment',
            name='problem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='store.problem'),
        ),
    ]
