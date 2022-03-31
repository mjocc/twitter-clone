from django import template

from twitter.models import Tweet, Tweeter

register = template.Library()


@register.filter(is_safe=True)
def liked_by(tweet, tweeter):
    if isinstance(tweet, Tweet) and isinstance(tweeter, Tweeter):
        return tweeter.likes_tweet(tweet.id)
