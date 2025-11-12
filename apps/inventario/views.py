from django.http import JsonResponse

# Create your views here.
def prueba_inventario(request):
    return JsonResponse({"mensaje": "Prueba inventario lista"})