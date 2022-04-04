from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Tweet, Tweeter
from .permissions import DeleteIfAuthor, ModifyIfUser
from .serializers import TweeterSerializer, TweetSerializer


class TweeterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tweeters to be viewed or edited.
    """

    queryset = Tweeter.objects.all()
    serializer_class = TweeterSerializer
    permission_classes = [ModifyIfUser]
    filterset_fields = ("following__username", "followed_by__username")


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
    permission_classes = [DeleteIfAuthor, IsAuthenticatedOrReadOnly]
    filterset_fields = ("replied_tweet", "author__username", "liked_by__username")