import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Tweeter(AbstractUser):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    profile_name = models.CharField(max_length=50)
    likes = models.ManyToManyField("Tweet", related_name="likes", blank=True)
    following = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers", blank=True
    )

    class Meta:
        verbose_name = "tweeter"
        verbose_name_plural = "tweeters"

    def likes_tweet(self, tweet_id):
        return self.likes.filter(id=tweet_id).exists()

    def __str__(self):
        return f"@{self.username}"


class Tweet(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    text = models.CharField(max_length=280)
    created = models.DateTimeField("datetime created", auto_now_add=True)
    author = models.ForeignKey(Tweeter, related_name="tweets", on_delete=models.CASCADE)
    reply = models.BooleanField(default=False)
    replied_tweet = models.ForeignKey(
        "self",
        verbose_name="tweet replied to",
        related_name="replies",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    # if reply is true but replied is null then the tweet must've been deleted

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f'"{self.text}" - @{self.author.username}'


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)