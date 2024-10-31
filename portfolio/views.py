from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def index_view(request: HttpRequest) -> HttpResponse:
    return render(request, "index.html")
