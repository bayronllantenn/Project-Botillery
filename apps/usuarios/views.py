from django.http import JsonResponse

# Create your views here.
def prueba_usuario(request):
    return JsonResponse({"mensaje": "Prueba usuarios lista"})