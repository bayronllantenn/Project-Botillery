from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from apps.inventario.models import Producto
from .models import Transaccion, DetalleTransaccion
from .serializers import VentaCreateSerializer, VentaListSerializer

@api_view(["GET"])
def ventas_listar(request):
    # obtengo solo las transacciones que son ventas (tipo='V') la cual esta establecida en los modelos
    # prefetch_related("detalles") evita muchas consultas a la base al traer los detalles de cada venta
    # order_by("-id") muestra primero la venta más reciente
    qs = Transaccion.objects.filter(tipo='V').prefetch_related("detalles").order_by("-id")
    serializer = VentaListSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def ventas_crear(request):
    # recibo la venta desde el frontend como una lista de detalles (producto, cantidad, precio)
    serializer = VentaCreateSerializer(data=request.data)
    # si algo no sale como debe envio un error con los detalles
    serializer.is_valid(raise_exception=True)
    # el serializer se encarga de crear la la venta y de descontar el stock
    venta = serializer.save()
    return Response(VentaListSerializer(venta).data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
def ventas_resumen(request):
    # cantidad de ventas osea "V"
    ventas_count = Transaccion.objects.filter(tipo='V').count()
    productos_disponibles = Producto.objects.count()
    
    detalles = DetalleTransaccion.objects.filter(transaccion__tipo='V')
    total_vendido = sum(d.cantidad * d.precio_unitario for d in detalles)
# retorno un resumen para mostrar 
    return Response({
        "mis_ventas": ventas_count,
        "total_vendido": total_vendido,
        "productos_disponibles": productos_disponibles,
    })