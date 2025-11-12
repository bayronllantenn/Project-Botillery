from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Usuario
        fields = ["id", "user", "username", "nombre", "rol"]
