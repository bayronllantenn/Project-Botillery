from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from apps.inventario.models import Producto
from .models import Venta, DetalleVenta
from .serializers import VentaCreateSerializer, VentaListSerializer

@api_view(["GET"])
def ventas_listar(request):
    qs = Venta.objects.prefetch_related("detalles").order_by("-id")
    serializer = VentaListSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def ventas_crear(request):
    serializer = VentaCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    venta = serializer.save()
    return Response(VentaListSerializer(venta).data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
def ventas_resumen(request):
    ventas_count = Venta.objects.count()
    productos_disponibles = Producto.objects.count()
    
    detalles = DetalleVenta.objects.all()
    total_vendido = sum(d.cantidad * d.precio_unitario for d in detalles)

    return Response({
        "mis_ventas": ventas_count,
        "total_vendido": total_vendido,
        "productos_disponibles": productos_disponibles,
    })