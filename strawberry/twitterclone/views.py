from rest_framework import mixins, viewsets, decorators
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.filters import SearchFilter

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
    filterset_fields = (
        "username",
        "following__username",
        "followed_by__username",
    )
    search_fields = ("username", "profile_name")


class TweetViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    API endpoint that allows tweets to be viewed or created.
    """

    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [DeleteIfAuthor, IsAuthenticatedOrReadOnly]
    filterset_fields = (
        "replied_tweet",
        "author__username",
        "author__followed_by__username",
        "liked_by__username",
        "reply",
    )
    search_fields = ("text",)


@decorators.api_view(["PATCH"])
@decorators.permission_classes([IsAuthenticated])
def like_tweet_view(request, tweet_id=None):
    """
    API endpoint that allows tweets to be liked and unliked.
    A `liked` boolean parameter should be passed.
    """
    liked = request.data.get("liked")
    user = request.user

    try:
        tweet = Tweet.objects.get(id=tweet_id)
    except Tweet.DoesNotExist:
        return Response({"detail": "Not found."}, status=404)

    if liked:
        user.likes.add(tweet)
    else:
        user.likes.remove(tweet)

    return Response({"liked": user.likes_tweet(tweet)})


@decorators.api_view(["PATCH"])
@decorators.permission_classes([IsAuthenticated])
def follow_tweeter_view(request, tweeter_id=None):
    """
    API endpoint that allows tweeters to be followed and unfollowed.
    A `following` boolean parameter should be passed.
    """
    following = request.data.get("following")
    user = request.user

    try:
        tweeter = Tweeter.objects.get(id=tweeter_id)
    except Tweeter.DoesNotExist:
        return Response({"detail": "Not found."}, status=404)

    if following:
        user.following.add(tweeter)
    else:
        user.following.remove(tweeter)

    return Response({"following": user.is_following(tweeter)})


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "username": user.username,
                "profile_name": user.profile_name,
            }
        )
