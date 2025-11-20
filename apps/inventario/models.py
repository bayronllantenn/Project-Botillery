from django.db import models

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)
    def __str__(self): 
        return self.nombre
    
class Proveedor(models.Model):
    nombre = models.CharField(max_length=150)
    telefono = models.CharField(max_length=30, blank=True)
    correo = models.EmailField(blank=True)
    direccion = models.CharField(max_length=200, blank=True)
    def __str__(self): 
        return self.nombre

class Producto(models.Model):
    # Las relaciones
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name="productos")
    proveedor = models.ForeignKey(Proveedor, on_delete=models.PROTECT, related_name="productos", null=True, blank=True)
    
    #  identidad del producto - vista producto 
    codigo_barra = models.CharField(max_length=50, blank=True, null=True, unique=True)
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    imagen = models.ImageField(upload_to="productos", null=True, blank=True)
    
    # precios - Vista Productos 
    formato_venta = models.CharField(max_length=100, blank=True) 
    precio = models.PositiveIntegerField(verbose_name="Precio Venta") 
    
    # vista inventario
    stock = models.PositiveIntegerField(default=0)
    costo = models.PositiveIntegerField(default=0)
    
    def __str__(self): 
        return f"{self.nombre} - {self.formato_venta}"

class Compra(models.Model):
    proveedor = models.ForeignKey(Proveedor, on_delete=models.PROTECT, related_name="compras")
    fecha_hora = models.DateTimeField(auto_now_add=True)
    total = models.PositiveIntegerField(default=0)
    def __str__(self): 
        return f"Compra #{self.id}"

class DetalleCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT, related_name="detalles_compra")
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.producto.nombre} x{self.cantidad}"
