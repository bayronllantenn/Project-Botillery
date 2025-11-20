from django.urls import path
from .views import (
    producto_lista,
    producto_detalle,
    categoria_lista,
    categoria_detalle,
    proveedor_lista,
    ajustar_stock,
)

urlpatterns = [
    path("productos/", producto_lista),
    path("productos/<int:pk>/", producto_detalle),
    path("categorias/", categoria_lista),
    path("categorias/<int:pk>/", categoria_detalle),
    path("proveedores/", proveedor_lista),
    path("productos/ajustar_stock/", ajustar_stock),
]
