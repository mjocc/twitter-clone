# Generated by Django 4.0.3 on 2022-04-04 11:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('twitterclone', '0002_alter_tweeter_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tweeter',
            options={'ordering': ['profile_name'], 'verbose_name': 'tweeter', 'verbose_name_plural': 'tweeters'},
        ),
    ]