# Generated by Django 5.1.6 on 2025-03-06 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='priority',
            field=models.IntegerField(choices=[(1, 'Low'), (2, 'Normal'), (3, 'High')], default=2),
        ),
    ]
