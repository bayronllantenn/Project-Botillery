from rest_framework import serializers
from django.db import transaction
from .models import Transaccion, DetalleTransaccion
from apps.inventario.models import Producto

class DetalleInputSerializer(serializers.Serializer):
    # Cada detalle que llega desde el frontend trae id del producto, cantidad y precio
    producto_id = serializers.IntegerField()
    cantidad = serializers.IntegerField(min_value=1)
    precio_unitario = serializers.IntegerField(min_value=0)

class VentaCreateSerializer(serializers.Serializer):
    # Valido que siempre venga al menos un detalle
    detalles = DetalleInputSerializer(many=True, allow_empty=False)
# transaction atomic nos sirve si hay un error en cualquier paso ej al descontar stock después de una venta todo el proceso se cancela
    @transaction.atomic
    def create(self, validated_data):
        # Creo el registro Transaccion que va a agrupar todos los detalles
        detalles_data = validated_data["detalles"]
        venta = Transaccion.objects.create(tipo='V')

        # Recorro cada item
        for item in detalles_data:
            pid = item["producto_id"]
            cant = item["cantidad"]
            precio = item["precio_unitario"]

            # Verifico que el producto exista
            try:
                prod = Producto.objects.get(pk=pid)
            except Producto.DoesNotExist:
                raise serializers.ValidationError({"error": f"El producto {pid} no existe"})

            # Valido stock antes de descontar
            if prod.stock < cant:
                raise serializers.ValidationError({"error": f"Stock insuficiente para {prod.nombre}"})

            # Guardo el detalle de la venta
            DetalleTransaccion.objects.create(
                transaccion=venta,
                producto=prod,
                cantidad=cant,
                precio_unitario=precio,
            )

            # Descuento el stock del producto
            prod.stock -= cant
            prod.save()

        # Calculo y guardo el total
        total = sum(item["cantidad"] * item["precio_unitario"] for item in detalles_data)
        venta.total = total
        venta.save()
        return venta


class DetalleVentaSerializer(serializers.ModelSerializer):
    # defino la ruta para acceder al objeto 
    nombre_producto = serializers.ReadOnlyField(source="producto.nombre")

    class Meta:
        model = DetalleTransaccion
        fields = ["producto_id", "nombre_producto", "cantidad", "precio_unitario"]

class VentaListSerializer(serializers.ModelSerializer):
    # Incluyo los detalles como nested para listar una venta completa
    detalles = DetalleVentaSerializer(many=True, read_only=True)
    # Calculo el total como suma de cada detalle
    total = serializers.SerializerMethodField()

# defino que datos va a mostrar 
    class Meta:
        model = Transaccion
        fields = ["id", "fecha_hora", "total", "detalles"]
# obtengo el total del precio 
    def get_total(self, obj):
        return sum(d.cantidad * d.precio_unitario for d in obj.detalles.all())
