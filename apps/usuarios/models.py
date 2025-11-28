from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Usuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="perfil")
    nombre = models.CharField(max_length=255)
    # Usamos choices para limitar los roles permitidos los cuales solo puedan ser estos 3 y por defecto sea vendedor
    class Roles(models.TextChoices):
        ADMIN = "admin", "Administrador"
        VENDEDOR = "vendedor", "Vendedor"
        BODEGUERO = "bodeguero","Bodeguero"


    rol = models.CharField(
        max_length=50,
        choices=Roles.choices,
        default=Roles.VENDEDOR,
    )

    def __str__(self):
        return self.nombre
