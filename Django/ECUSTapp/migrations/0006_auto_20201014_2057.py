# Generated by Django 3.0.8 on 2020-10-14 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ECUSTapp', '0005_auto_20201009_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ques',
            name='quesDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]