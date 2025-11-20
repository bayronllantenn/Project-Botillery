from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Venta
from .serializers import VentaListSerializer, VentaCreateSerializer

@api_view(["GET"])
def ventas_listar(request):
    qs = Venta.objects.prefetch_related("detalles").order_by("-id")
    return Response(VentaListSerializer(qs, many=True).data)

@api_view(["POST"])
def ventas_crear(request):
    serializer = VentaCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    venta = serializer.save()
    return Response(VentaListSerializer(venta).data, status=status.HTTP_201_CREATED)