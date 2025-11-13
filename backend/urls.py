from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home(request):
    return Response({
        "usuarios": "/api/usuarios/",
        "inventario": "/api/inventario/",
        "ventas": "/api/ventas/",
    })

urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/usuarios/", include("apps.usuarios.urls")),
    path("api/inventario/", include("apps.inventario.urls")),
    path("api/ventas/", include("apps.ventas.urls")),
]
