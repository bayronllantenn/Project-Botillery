from django.urls import path
from .views import usuarios

urlpatterns = [
    path("", usuarios),
]