from django import forms


class LikeTweetForm(forms.Form):
    tweet_id = forms.UUIDField()
    liked = forms.BooleanField(required=False)
