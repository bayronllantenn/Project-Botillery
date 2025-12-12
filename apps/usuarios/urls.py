from django.urls import path
from .views import usuarios, register, login_view, usuario_detalle

urlpatterns = [
    path("", usuarios),
    path("register/", register),
    path("login/", login_view),
    path("<int:pk>/", usuario_detalle),
]
