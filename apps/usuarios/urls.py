from django.urls import path
from .views import usuarios, register, login_view

urlpatterns = [
    path("", usuarios),
    path("register/", register),
    path("login/", login_view),
]
