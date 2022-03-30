import uuid

from django.contrib.auth.models import User
from django.db import models


class Tweeter(models.Model):
    id = models.UUIDField(primary_key=True, editable=False,
                          default=uuid.uuid4)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField("Tweet", related_name="liked_by", blank=True)
    following = models.ManyToManyField("self", symmetrical=False,
                                       related_name="followers", blank=True)

    def __str__(self):
        return f"@{self.user.username}"


class Tweet(models.Model):
    id = models.UUIDField(primary_key=True, editable=False,
                          default=uuid.uuid4)
    text = models.CharField(max_length=280)
    created = models.DateTimeField('datetime created', auto_now_add=True)
    author = models.ForeignKey(Tweeter, related_name="tweets", on_delete=models.CASCADE)
    reply = models.BooleanField(default=False)
    replied_tweet = models.ForeignKey('self', verbose_name='tweet replied to',
                                      related_name="replies", null=True,
                                      blank=True, on_delete=models.SET_NULL)
    # if reply is true but replied is null then the tweet must've been deleted

    def __str__(self):
        return f'"{self.text}" - @{self.author.user.username}'
