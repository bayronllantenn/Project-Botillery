from django.urls import path
from .views import prueba_ventas   

urlpatterns = [
    path('', prueba_ventas),
]