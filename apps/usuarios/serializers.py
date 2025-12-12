from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "username", "nombre", "rol", "email"]

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=4)
    nombre = serializers.CharField(required=True)
    rol = serializers.ChoiceField(choices=Usuario.Roles.choices, required=False)

# validamos que el nombre de usuario sea unico en las dos tablas tanto en la de django como en la nuestar
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya existe.")
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya existe.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está asociado a otro usuario.")
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está asociado a otro usuario.")
        return value

    def create(self, validated_data):
        rol = validated_data.get("rol", Usuario.Roles.VENDEDOR)
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        usuario_perfil = Usuario.objects.create(
            user=user,
            username=validated_data["username"],
            email=validated_data["email"],
            nombre=validated_data["nombre"],
            rol=rol,
        )
        return usuario_perfil
