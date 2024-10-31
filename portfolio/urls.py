from django.urls import path

from portfolio.views import index_view


urlpatterns = [
    path("", index_view),
]
