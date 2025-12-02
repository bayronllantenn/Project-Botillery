from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Usuario
from .serializers import UsuarioSerializer, RegisterSerializer

@api_view(["GET"])
# permite obtener una lista de todos los perfiles de usuario
def usuarios(request):
    #consulta a la base de datos
    users = Usuario.objects.all()
    # convierte los objetos de la BD osea Python en datos serializables JSON
    #                                      many true indica que estamos serializando una lista de objetos 
    serializer = UsuarioSerializer(users, many=True)
    # retorna los datos serializados JSON con un codigo 200 Ok por defecto 
    return Response(serializer.data)

@api_view(["POST"])
def register(request):
    # maneja la creacion de un nuevo usuario en el sistema
    # serializer = crea una instancia del serializaer inyectando los datos en el data como pueden ser username , password .. etc
    serializer = RegisterSerializer(data=request.data)
    # verifica las reglas definidas en el serializer como longitud , etc
    if serializer.is_valid():
        usuario = serializer.save()
        return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login_view(request):
    #  verifica las credenciales de un usuario para iniciar sesion solo acepta peticiones post
    # obtengo los datos username , passworrd 
    username = request.data.get("username")
    password = request.data.get("password")

#   llamo a la funcion de django para autenticar si el usuario contraseña coinciden 
# retorna un objeto User si es exitoso , o none si falla 
    user = authenticate(username=username, password=password)
# logica post autenticacion : se ejecuta solo si la autenticacion fue exitosa 
    if user is not None:
        try:
            # itnento obtener el perfil (usuario) asociado a user autenticado 
            perfil = Usuario.objects.get(user=user)
        except Usuario.DoesNotExist:
            # manejo de inconsistencia si el user existe pero el perfil de usuario no se crea
            perfil = Usuario.objects.create(
                user=user,
                nombre=user.get_full_name() or user.username,
                rol=Usuario.Roles.VENDEDOR,
            )
#       respuesta de exito: retorno los datos del usuario con codigo 200 
        return Response({
            "id": user.id,
            "username": user.username,
            "nombre": perfil.nombre,
            "rol": perfil.rol,
        }, status=status.HTTP_200_OK)
    # condicion de error en caso de que las credenciales sean none o invalidas
    return Response({"Error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)
