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
    liked = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()

    def get_liked(self, instance):
        if user := get_user_or_none(self.context):
            return user.likes_tweet(instance)

    def get_like_count(self, instance):
        return instance.liked_by.count()

    def get_reply_count(self, instance):
        return instance.replies.count()

    class Meta:
        model = Tweet
        fields = (
            "id",
            "text",
            "created",
            "reply",
            "author",
            "replied_tweet",
            "liked",
            "like_count",
            "reply_count",
        )
        read_only_fields = ("author", "reply")

    def create(self, validated_data):
        tweet = Tweet(**validated_data)
        tweet.reply = bool(validated_data["replied_tweet"])
        tweet.author = get_user_or_none(self.context)
        tweet.save()
        return tweet


def get_user_or_none(context):
    if hasattr((request := context.get("request")), "user"):
        user = request.user
        return user if not user.is_anonymous else None
