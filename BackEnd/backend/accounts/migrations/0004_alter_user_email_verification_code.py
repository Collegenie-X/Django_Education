# Generated by Django 4.2.9 on 2024-07-30 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_email_verification_code_user_is_email_verified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email_verification_code',
            field=models.CharField(default='b7407653301f446bb598be77f43ab4fc', editable=False, max_length=32),
        ),
    ]
