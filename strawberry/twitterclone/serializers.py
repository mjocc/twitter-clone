from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Tweeter


class TweeterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweeter
        fields = ["id", "profile_name", "likes", "following"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tweeter = TweeterSerializer()

    class Meta:
        model = User
        fields = ["url", "username", "tweeter"]
