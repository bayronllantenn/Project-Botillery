from rest_framework import serializers
from .models import Categoria, Producto, Proveedor, Compra, DetalleCompra

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre", "descripcion"]

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "telefono", "correo", "direccion"]

class ProductoSerializer(serializers.ModelSerializer):
    categoria_detalle = CategoriaSerializer(source="categoria", read_only=True)
    proveedor_detalle = ProveedorSerializer(source="proveedor", read_only=True)

    class Meta:
        model = Producto
        fields = [
            "id",
            "categoria",
            "proveedor",
            "codigo_barra",
            "nombre",
            "descripcion",
            "imagen",
            "formato_venta",
            "precio",
            "stock",
            "costo",
            "categoria_detalle",
            "proveedor_detalle",
        ]

class DetalleCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCompra
        fields = ["id", "compra", "producto", "cantidad", "precio_unitario"]

class CompraSerializer(serializers.ModelSerializer):
    detalles = DetalleCompraSerializer(many=True, read_only=True)
    class Meta:
        model = Compra
        fields = ["id", "proveedor", "fecha_hora", "total", "detalles"]
