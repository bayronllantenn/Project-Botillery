from django.urls import path
from .views import inventario_root, categorias, productos, proveedores

urlpatterns = [
    path("", inventario_root),
    path("categorias/", categorias),
    path("productos/", productos),
    path("proveedores/", proveedores),
]
