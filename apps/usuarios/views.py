from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Usuario
from .serializers import UsuarioSerializer

# Create your views here.
@api_view(["GET", "POST"])
def usuarios(request):
    if request.method == "GET":
        return Response(UsuarioSerializer(Usuario.objects.all(), many=True).data)
    s = UsuarioSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
    s.save()
    return Response(s.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def register(request):
    username = (request.data.get("username") or "").strip()
    password = request.data.get("password") or ""
    nombre = (request.data.get("nombre") or username).strip()
    email = (request.data.get("email") or "").strip()

    if not username or not password:
        return Response({"error": "Usuario y Contraseña son obligatorios"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "username ya está en uso"}, status=400)
    if len(password) < 4:
        return Response({"error": "password debe tener al menos 4 caracteres"}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)
    perfil = Usuario.objects.create(user=user, nombre=nombre or username, rol="trabajador")
    data = {
        "id": user.id,
        "username": user.username,
        "nombre": perfil.nombre,
        "rol": perfil.rol,
    }
    return Response(data, status=201)


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if not username or not password:
        return Response({"error": "Usuario y Contraseña son obligatorios"}, status=400)
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"error": "Credenciales inválidas"}, status=400)
    perfil = getattr(user, "perfil", None) or Usuario.objects.filter(user=user).first()
    data = {
        "id": user.id,
        "username": user.username,
        "nombre": perfil.nombre if perfil else user.username,
        "rol": perfil.rol if perfil else "trabajador",
    }
    return Response(data, status=200)
