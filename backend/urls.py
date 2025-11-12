from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"mensaje": "Backend funcionando"})

urlpatterns = [
    path("", home),
    path('admin/', admin.site.urls),
    path('api/usuarios', include('apps.usuarios.urls')),
    path('api/inventario', include('apps.inventario.urls')),
    path('api/ventas', include('apps.ventas.urls')),
    
]