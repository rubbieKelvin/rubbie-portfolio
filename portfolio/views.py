from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def index_view(request: HttpRequest) -> HttpResponse:
    return render(request, "index.html")


def projects_view(request: HttpRequest) -> HttpResponse:
    return render(request, "projects.html")


def about_view(request: HttpRequest) -> HttpResponse:
    return render(request, "about.html")


def contact_view(request: HttpRequest) -> HttpResponse:
    return render(request, "contact.html")
