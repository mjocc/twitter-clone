from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Tweet, Tweeter


@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display = ("text", "author", "created", "reply")
    fieldsets = (
        (None, {"fields": ("text", "author"), }),
        ("Reply", {"fields": ("reply", "replied_tweet")})
    )


class TweeterInline(admin.StackedInline):
    model = Tweeter
    can_delete = False
    verbose_name_plural = "tweeters"


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = (TweeterInline,)
