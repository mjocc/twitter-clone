# Generated by Django 3.2.5 on 2022-03-31 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0005_auto_20220330_1949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweeter',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='likes', to='twitter.Tweet'),
        ),
    ]