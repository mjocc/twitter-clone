from django.contrib import messages
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.views import View
from django.views.generic import DetailView
from django.views.generic.edit import FormView

from twitter.forms import LikeTweetForm
from twitter.models import Tweet


def index(request):
    return HttpResponse("Hello, world. You're at the twitter index.")


def profile(request, username):
    return HttpResponse(f"Username: {username}")


class TweetDetailView(DetailView):
    model = Tweet
    pk_url_kwarg = "tweet_id"
    context_object_name = "tweet"
    template_name = "twitter/views/tweet_view.html"


class LikeTweetFormView(FormView):
    template_name = "twitter/views/tweet_view.html"
    form_class = LikeTweetForm

    def get_success_url(self):
        return self.request.path

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        tweet_id = form.cleaned_data['tweet_id']
        tweet = Tweet.objects.get(id=tweet_id)
        if form.cleaned_data['liked']:
            self.request.user.tweeter.likes.add(tweet)
        else:
            self.request.user.tweeter.likes.remove(tweet)
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.add_message(self.request, messages.WARNING,
                             'Something went wrong. Please try again.')
        return super().form_invalid(form)


class TweetView(View):
    def get(self, request, *args, **kwargs):
        view = TweetDetailView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = LikeTweetFormView.as_view()
        return view(request, *args, **kwargs)
