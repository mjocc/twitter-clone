from rest_framework import serializers
from .models import Tweet, Tweeter


class TweeterSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        tweeter = Tweeter.objects.create_user(**validated_data)
        return tweeter

    class Meta:
        model = Tweeter
        fields = (
            "id",
            "username",
            "profile_name",
            # "likes",
            # "following",
            # "followers",
            # "tweets",
            "date_joined",
            "email",
            "password",
        )
        read_only_fields = ("date_joined",)
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"write_only": True},
        }


class TweetSerializer(serializers.ModelSerializer):
    author = TweeterSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ("id", "text", "created", "reply", "author", "replied_tweet")
        read_only_fields = ("author", "reply")

    def create(self, validated_data):
        tweet = Tweet(**validated_data)
        tweet.reply = bool(validated_data["replied_tweet"])
        tweet.author = self.context["request"].user
        tweet.save()
        return tweet
