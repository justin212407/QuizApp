# Generated by Django 5.1.3 on 2024-11-10 04:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quizapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='username',
            new_name='Question',
        ),
    ]