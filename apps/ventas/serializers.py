from rest_framework import serializers
from django.db import transaction
from .models import Venta, DetalleVenta
from apps.inventario.models import Producto

class DetalleVentaOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ["producto_id", "cantidad", "precio_unitario"]

class VentaListSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaOutSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Venta
        fields = ["id", "fecha_hora", "total", "detalles"]

    def get_total(self, obj):
        return sum(d.cantidad * d.precio_unitario for d in obj.detalles.all())

class ItemSerializer(serializers.Serializer):
    producto_id = serializers.IntegerField()
    cantidad = serializers.IntegerField(min_value=1)
    precio_unitario = serializers.IntegerField(min_value=0)

class VentaCreateSerializer(serializers.Serializer):
    detalles = ItemSerializer(many=True)

    def validate_detalles(self, value):
        if not value:
            raise serializers.ValidationError("Se requieren detalles")
        return value

    @transaction.atomic
    def create(self, validated_data):
        v = Venta.objects.create()
        for item in validated_data["detalles"]:
            pid = item["producto_id"]
            cant = item["cantidad"]
            precio = item["precio_unitario"]
            try:
                prod = Producto.objects.select_for_update().get(pk=pid)
            except Producto.DoesNotExist:
                raise serializers.ValidationError(f"Producto {pid} no existe")
            if prod.stock < cant:
                raise serializers.ValidationError(f"Stock insuficiente para producto {pid}")
            DetalleVenta.objects.create(venta=v, producto=prod, cantidad=cant, precio_unitario=precio)
            prod.stock -= cant
            prod.save(update_fields=["stock"])
        return v
