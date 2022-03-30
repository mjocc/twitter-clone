from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("@<str:username>/", views.profile, name="profile"),
    path("tweet/<uuid:tweet_id>/", views.TweetView.as_view(), name="tweet"),
]
