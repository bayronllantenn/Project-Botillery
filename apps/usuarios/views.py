from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Usuario
from .serializers import UsuarioSerializer, RegisterSerializer


@api_view(["GET"])
# permite obtener una lista de todos los perfiles de usuario
def usuarios(request):
    # consulta a la base de datos
    users = Usuario.objects.all()
    # convierte los objetos de la bd en datos serializables json
    # many=true indica que se esta serializando una lista de objetos
    serializer = UsuarioSerializer(users, many=True)
    # retorna los datos serializados json con un codigo 200 ok por defecto
    return Response(serializer.data)


@api_view(["POST"])
def register(request):
    # maneja la creacion de un nuevo usuario en el sistema
    # crea una instancia del serializer con los datos recibidos
    serializer = RegisterSerializer(data=request.data)
    # verifica las reglas definidas en el serializer como longitud formato y unicidad
    if serializer.is_valid():
        usuario = serializer.save()
        return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_view(request):
    # verifica las credenciales de un usuario para iniciar sesion solo acepta peticiones post
    # obtiene los datos username y password desde el body
    username = request.data.get("username")
    password = request.data.get("password")

    # llama a la funcion de django para autenticar si coinciden usuario y contrasena
    # retorna un objeto user si es exitoso o none si falla
    user = authenticate(username=username, password=password)

    # logica posterior a la autenticacion se ejecuta solo si la autenticacion fue exitosa
    if user is not None:
        try:
            # intenta obtener el perfil usuario asociado al user autenticado
            perfil = Usuario.objects.get(user=user)
        except Usuario.DoesNotExist:
            # maneja la inconsistencia si el user existe pero el perfil usuario no se creo
            perfil = Usuario.objects.create(
                user=user,
                nombre=user.get_full_name() or user.username,
                rol=Usuario.Roles.VENDEDOR,
            )

        # respuesta de exito retorna los datos del usuario con codigo 200
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "nombre": perfil.nombre,
                "rol": perfil.rol,
            },
            status=status.HTTP_200_OK,
        )

    # condicion de error si las credenciales son none o invalidas
    return Response({"Error": "Credenciales invalidas"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
# vista para obtener actualizar o eliminar un usuario especifico por id
def usuario_detalle(request, pk):
    try:
        usuario = Usuario.objects.get(pk=pk)
    except Usuario.DoesNotExist:
        # si el usuario no existe se responde con 404
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        # devuelve el detalle de un solo usuario
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    if request.method == "PUT":
        # actualiza parcialmente los datos del usuario
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        # si hay errores de validacion responde con 400 y el detalle
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        # elimina el usuario de la base de datos
        usuario.delete()
        # devuelve 204 no content para indicar que se borro correctamente
        return Response(status=status.HTTP_204_NO_CONTENT)
