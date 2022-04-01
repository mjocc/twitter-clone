from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Tweet, Tweeter


@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display = ("text", "author", "created", "reply")
    fieldsets = (
        (None, {"fields": ("text", "author"), }),
        ("Reply", {"fields": ("reply", "replied_tweet")})
    )


admin.site.register(Tweeter, UserAdmin)
