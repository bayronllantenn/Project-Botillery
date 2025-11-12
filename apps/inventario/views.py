from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Categoria, Producto, Proveedor
from .serializers import CategoriaSerializer, ProductoSerializer, ProveedorSerializer
from django.db import transaction
from django.shortcuts import get_object_or_404

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

@api_view(["POST"])
@transaction.atomic
def ajustar_stock(request):
    producto_id = request.data.get("producto_id")
    cantidad = request.data.get("cantidad")
    if producto_id is None or cantidad is None:
        return Response({"error": "producto_id y cantidad son obligatorios"}, status=400)
    try:
        producto_id = int(producto_id)
        cantidad = int(cantidad)
    except (TypeError, ValueError):
        return Response({"error": "La cantidad y el ID deben ser números"}, status=400)
    if cantidad == 0:
        return Response({"error": "La cantidad no puede ser cero"}, status=400)
    prod = get_object_or_404(Producto.objects.select_for_update(), pk=producto_id)
    nuevo_stock = prod.stock + cantidad
    if nuevo_stock < 0:
        return Response({"error": f"Stock insuficiente. Solo quedan {prod.stock}"}, status=400)
    prod.stock = nuevo_stock
    prod.save(update_fields=["stock"])
    return Response({"id": prod.id, "stock": prod.stock}, status=200)
