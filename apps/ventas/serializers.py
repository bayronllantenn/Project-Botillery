from rest_framework import serializers
from django.db import transaction
from .models import Venta, DetalleVenta
from apps.inventario.models import Producto


class VentaListSerializer(serializers.ModelSerializer):
    detalles = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Venta
        fields = ["id", "fecha_hora", "total", "detalles"]

    def get_detalles(self, obj):
        return [
            {"producto_id": d.producto_id, "cantidad": d.cantidad, "precio_unitario": d.precio_unitario}
            for d in obj.detalles.all()
        ]

    def get_total(self, obj):
        return sum(d.cantidad * d.precio_unitario for d in obj.detalles.all())


class VentaCreateSerializer(serializers.Serializer):
    detalles = serializers.ListField(child=serializers.DictField(), allow_empty=False)

    @transaction.atomic
    def create(self, validated_data):
        detalles = validated_data.get("detalles") or []
        if not detalles:
            raise serializers.ValidationError({"Error": "Se requieren detalles"})

        v = Venta.objects.create()

        for item in detalles:
            try:
                pid = int(item.get("producto_id"))
                cant = int(item.get("cantidad"))
                precio = int(item.get("precio_unitario"))
            except (TypeError, ValueError):
                raise serializers.ValidationError({"Error": "producto_id/cantidad/precio_unitario deben ser enteros"})

            if cant <= 0 or precio < 0:
                raise serializers.ValidationError({"Error": "cantidad > 0 y precio >= 0"})

            try:
                prod = Producto.objects.get(pk=pid)
            except Producto.DoesNotExist:
                raise serializers.ValidationError({"Error": f"producto {pid} no existe"})

            if prod.stock < cant:
                raise serializers.ValidationError({"Error": f"stock insuficiente para producto {prod.nombre}"})

            DetalleVenta.objects.create(venta=v, producto=prod, cantidad=cant, precio_unitario=precio)
            
            prod.stock -= cant
            prod.save()

        return v