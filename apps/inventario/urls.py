from django.urls import path
from .views import categorias, productos, proveedores, ajustar_stock

urlpatterns = [
    path("categorias/", categorias),
    path("productos/", productos),
    path("proveedores/", proveedores),
    path("productos/ajustar_stock/", ajustar_stock),
]
