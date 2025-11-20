from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Usuario
from .serializers import UsuarioSerializer, RegisterSerializer

@api_view(["GET"])
def usuarios(request):
    users = Usuario.objects.all()
    serializer = UsuarioSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        try:
            perfil = Usuario.objects.get(user=user)
            nombre = perfil.nombre
            rol = perfil.rol
        except Usuario.DoesNotExist:
            nombre = user.username
            rol = "admin"

        return Response({
            "id": user.id,
            "username": user.username,
            "nombre": nombre,
            "rol": rol,
        }, status=status.HTTP_200_OK)
        
    return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)