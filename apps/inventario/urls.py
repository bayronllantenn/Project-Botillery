from django.urls import path
from .views import prueba_inventario   

urlpatterns = [
    path('', prueba_inventario),
]