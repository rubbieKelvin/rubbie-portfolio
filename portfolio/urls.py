from django.urls import path

from portfolio.views import about_view, contact_view, index_view, projects_view


urlpatterns = [
    path("", index_view, name="index"),
    path("about", about_view, name="about"),
    path("projects", projects_view, name="projects"),
    path("contact", contact_view, name="contact"),
]
