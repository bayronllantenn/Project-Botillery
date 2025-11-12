from django.db import models
from apps.inventario.models import Producto

# Create your models here.
class Venta(models.Model):
    fecha_hora = models.DateTimeField(auto_now_add=True)
    def __str__(self): 
        return f"Venta #{self.id}"

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.producto.nombre} x{self.cantidad}"