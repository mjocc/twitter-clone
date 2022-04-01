from rest_framework import permissions, viewsets, mixins

from .models import Tweet, Tweeter
from .serializers import TweeterSerializer, TweetSerializer
from .permissions import IsAuthenticatedOrPost, ModifyIfAuthor


class TweeterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tweeters to be viewed or edited.
    """

    queryset = Tweeter.objects.all()
    serializer_class = TweeterSerializer
    permission_classes = [IsAuthenticatedOrPost]


class TweetViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    API endpoint that allows tweets to be viewed or edited.
    """

    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticated, ModifyIfAuthor]
