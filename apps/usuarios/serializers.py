from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Usuario
        fields = ["id", "username", "nombre", "rol"]

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=4)
    nombre = serializers.CharField(required=True)
    rol = serializers.CharField(default="trabajador")

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya existe.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        usuario_perfil = Usuario.objects.create(
            user=user,
            nombre=validated_data['nombre'],
            rol=validated_data.get('rol', 'trabajador')
        )
        
        return usuario_perfil