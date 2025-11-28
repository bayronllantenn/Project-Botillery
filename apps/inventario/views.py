from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Categoria, Producto, Proveedor
from .serializers import CategoriaSerializer, ProductoSerializer, ProveedorSerializer

# utilizamos api view para poder ver esta funcion en el backend 
@api_view(['GET', 'POST'])
def producto_lista(request):
    if request.method == 'GET':
        productos = Producto.objects.all()
        # serializamos productos la cual contiene todos los objetos dentro y mediante many le decimos que es una lista de objetos
        # mediante data son los datos que el cliente envio al backend en el cuerpo de la peticion ej JSON 
        # y con context es un diccionario que se le pasa al serializador para que este pueda entender la informacion contextualizada necesaria osea
        # quien hace la peticion , rol , tambien proporciona la direccion del servidor o el metodo http utilizado osea en este caso un GET 
        serializer = ProductoSerializer(productos, many=True, context={'request': request})
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = ProductoSerializer(data=request.data, context={'request': request})
        # metodo de django el cual valida que todos los campos esten presentes , los datos sean correctos
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def producto_detalle(request, pk):
    producto = get_object_or_404(Producto, pk=pk)

    if request.method == 'GET':
        # context={'request': request}) = inyecta el objeto completo dentro del serializer esto permite que el serializer acceda a informacion 
        # contextual osea como el dominio , el usuario logueado , si necesita construir urls completas como ej puede ser una img o el detalle de un 
        # producto
        serializer = ProductoSerializer(producto, context={'request': request})
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ProductoSerializer(producto, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def ajustar_stock(request):
    producto_id = request.data.get('producto_id')
    cantidad = request.data.get('cantidad')

    if not producto_id or cantidad is None:
        return Response({"error": "Faltan datos"}, status=400)

    producto = get_object_or_404(Producto, pk=producto_id)

    try:
        nueva_cantidad = int(cantidad)
        if nueva_cantidad == 0:
             return Response({"error": "La cantidad no puede ser 0"}, status=400)
             
        nuevo_stock = producto.stock + nueva_cantidad
        
        if nuevo_stock < 0:
            return Response({"error": "Stock insuficiente"}, status=400)

        producto.stock = nuevo_stock
        producto.save()
        return Response({"mensaje": "Stock actualizado", "stock_actual": producto.stock})
        
    except ValueError:
        return Response({"error": "La cantidad debe ser un número"}, status=400)

@api_view(['GET', 'POST'])
def categoria_lista(request):
    if request.method == 'GET':
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = CategoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def categoria_detalle(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)

    if request.method == 'GET':
        serializer = CategoriaSerializer(categoria)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = CategoriaSerializer(categoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    categoria.delete()
    return Response(status=204)

@api_view(['GET', 'POST'])
def proveedor_lista(request):
    if request.method == 'GET':
        proveedores = Proveedor.objects.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def proveedor_detalle(request, pk):
    proveedor = get_object_or_404(Proveedor, pk=pk)

    if request.method == 'GET':
        serializer = ProveedorSerializer(proveedor)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ProveedorSerializer(
            proveedor, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    proveedor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
