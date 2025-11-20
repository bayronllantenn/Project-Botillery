from rest_framework import serializers
from django.db import transaction
from .models import Venta, DetalleVenta
from apps.inventario.models import Producto

class DetalleInputSerializer(serializers.Serializer):
    producto_id = serializers.IntegerField()
    cantidad = serializers.IntegerField(min_value=1)
    precio_unitario = serializers.IntegerField(min_value=0)

class VentaCreateSerializer(serializers.Serializer):
    detalles = DetalleInputSerializer(many=True, allow_empty=False)

    @transaction.atomic
    def create(self, validated_data):
        detalles_data = validated_data['detalles']
        venta = Venta.objects.create()

        for item in detalles_data:
            pid = item['producto_id']
            cant = item['cantidad']
            precio = item['precio_unitario']

            try:
                prod = Producto.objects.get(pk=pid)
            except Producto.DoesNotExist:
                raise serializers.ValidationError({"error": f"El producto {pid} no existe"})

            if prod.stock < cant:
                raise serializers.ValidationError({"error": f"Stock insuficiente para {prod.nombre}"})

            DetalleVenta.objects.create(venta=venta, producto=prod, cantidad=cant, precio_unitario=precio)
            
            prod.stock -= cant
            prod.save()

        return venta

class DetalleVentaSerializer(serializers.ModelSerializer):
    nombre_producto = serializers.ReadOnlyField(source='producto.nombre')
    
    class Meta:
        model = DetalleVenta
        fields = ['producto_id', 'nombre_producto', 'cantidad', 'precio_unitario']

class VentaListSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Venta
        fields = ["id", "fecha_hora", "total", "detalles"]

    def get_total(self, obj):
        return sum(d.cantidad * d.precio_unitario for d in obj.detalles.all())