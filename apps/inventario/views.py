from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Categoria, Producto, Proveedor
from .serializers import CategoriaSerializer, ProductoSerializer, ProveedorSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def inventario_root(request):
    return Response({
        "categorias": "/api/inventario/categorias/",
        "productos": "/api/inventario/productos/",
        "proveedores": "/api/inventario/proveedores/",
    })

@api_view(["GET", "POST"])
def categorias(request):
    if request.method == "GET":
        return Response(CategoriaSerializer(Categoria.objects.all(), many=True).data)
    s = CategoriaSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=status.HTTP_201_CREATED)
    return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
def productos(request):
    if request.method == "GET":
        return Response(ProductoSerializer(Producto.objects.all(), many=True).data)
    s = ProductoSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=status.HTTP_201_CREATED)
    return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
def proveedores(request):
    if request.method == "GET":
        return Response(ProveedorSerializer(Proveedor.objects.all(), many=True).data)
    s = ProveedorSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=status.HTTP_201_CREATED)
    return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
