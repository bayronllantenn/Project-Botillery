from django.urls import path
from .views import ventas_listar, ventas_crear, ventas_resumen

urlpatterns = [
    path("", ventas_listar),
    path("crear/", ventas_crear),
    path("resumen/", ventas_resumen),
]
