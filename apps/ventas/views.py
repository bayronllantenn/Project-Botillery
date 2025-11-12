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
    s = VentaCreateSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
    v = s.save()
    return Response(VentaListSerializer(v).data, status=status.HTTP_201_CREATED)
