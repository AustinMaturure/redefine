# Generated by Django 5.0 on 2025-01-27 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_article_slug_alter_article_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='slug',
            field=models.SlugField(max_length=255),
        ),
    ]
