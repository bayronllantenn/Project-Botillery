from django.db import models
from django.contrib.auth.models import User

class Usuario(models.Model):
    class Roles(models.TextChoices):
        ADMIN = "admin", "Admin"
        CAJERO = "cajero", "Cajero"
        VENDEDOR = "vendedor", "Vendedor"

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=150)
    rol = models.CharField(max_length=20, choices=Roles.choices)

    def __str__(self):
        return self.username