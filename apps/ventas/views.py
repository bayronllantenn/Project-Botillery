from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

# Create your views here.
def prueba_ventas(request):
    return JsonResponse({"mensaje": "Prueba ventas lista"})