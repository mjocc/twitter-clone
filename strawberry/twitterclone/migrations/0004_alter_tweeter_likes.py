# Generated by Django 4.0.3 on 2022-04-04 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitterclone', '0003_alter_tweeter_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweeter',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_by', to='twitterclone.tweet'),
        ),
    ]
