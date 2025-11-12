from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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