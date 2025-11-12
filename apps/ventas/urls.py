from django.urls import path
from .views import ventas_listar, ventas_crear

urlpatterns = [
    path("", ventas_listar),
    path("crear/", ventas_crear),
]
