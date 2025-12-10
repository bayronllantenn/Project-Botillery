from django.db import models
from apps.inventario.models import Producto, Proveedor

# Create your models here.
class Transaccion(models.Model):
    TIPO_CHOICES = [('C', 'Compra'), ('V', 'Venta')]
    tipo = models.CharField(max_length=1, choices=TIPO_CHOICES)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.PROTECT, null=True, blank=True)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    total = models.PositiveIntegerField(default=0)

    def __str__(self): 
        return f"{self.tipo} #{self.id}"

class DetalleTransaccion(models.Model):
    transaccion = models.ForeignKey(Transaccion, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.producto.nombre} x{self.cantidad}"