from django.urls import path
from .views import inventario_root, categorias, productos, proveedores, ajustar_stock

urlpatterns = [
    path("", inventario_root),
    path("categorias/", categorias),
    path("productos/", productos),
    path("proveedores/", proveedores),
    path("productos/ajustar_stock/", ajustar_stock),
]
