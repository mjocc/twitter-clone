# Generated by Django 3.2.5 on 2022-03-30 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0004_alter_tweet_author'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tweet',
            options={'ordering': ['-created']},
        ),
        migrations.AddField(
            model_name='tweeter',
            name='profile_name',
            field=models.CharField(default='DEFAULT PROFILE NAME', max_length=50),
            preserve_default=False,
        ),
    ]