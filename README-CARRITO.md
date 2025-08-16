# 🛒 Carrito de Compras - Nikolle Puntaditas

## Sistema de Carrito de Compras Implementado

### 📋 Características del Sistema

1. **Gestión de Productos**
   - Productos cargados dinámicamente desde `api.json`
   - Visualización en tarjetas responsivas
   - Imágenes con fallback seguro

2. **Carrito de Compras**
   - Agregar/eliminar productos
   - Ajustar cantidades (+/-)
   - Persistencia en localStorage
   - Contador de items en tiempo real

3. **Proceso de Compra**
   - Vista previa del carrito
   - Cálculo automático de totales
   - Formulario de checkout
   - Integración con WhatsApp

### 🚀 Cómo Usar

#### 1. Navegación
- **Inicio (index.html)**: Muestra todos los productos disponibles
- **Compras (Compras.html)**: Vista principal del carrito
- **Checkout (checkout.html)**: Finalizar pedido

#### 2. Funcionalidades

**Agregar al Carrito:**
- Click en "Agregar al carrito" en cualquier producto
- El contador en el icono del carrito se actualiza automáticamente

**Gestionar Carrito:**
- En Compras.html puedes:
  - Ver todos los items agregados
  - Ajustar cantidades con botones +/- 
  - Eliminar items individualmente
  - Vaciar todo el carrito
  - Finalizar compra

**Finalizar Compra:**
- Click en "Finalizar Compra"
- Completa el formulario con tus datos
- El pedido se envía automáticamente por WhatsApp

### 📁 Archivos del Sistema

- `carrito.js`: Lógica principal del carrito
- `checkout.html`: Página de finalización de compra
- `api.json`: Base de datos de productos
- `app.js`: Funciones auxiliares

### 🛠️ Personalización

#### Agregar Nuevos Productos
Edita `api.json`:
```json
{
    "id": 7,
    "nombre": "Nuevo Producto",
    "precio": 25000
}
```

#### Cambiar Imágenes
- Guarda las imágenes en la carpeta `img/`
- Nombra los archivos según el nombre del producto (minúsculas)
- Ejemplo: `img/capibara.jpg` para "Capibara"

#### Modificar Precios
Edita directamente el precio en `api.json`

### 📱 Integración WhatsApp

El sistema envía automáticamente un mensaje con:
- Lista de productos
- Cantidades
- Total a pagar
- Datos del cliente
- Método de pago seleccionado

### 🎨 Estilos

Los estilos están en `style.css` y usan:
- Colores suaves y alegres
- Diseño responsivo
- Bootstrap 5 para componentes
- Animaciones suaves

### 🔧 Solución de Problemas

**Carrito no carga:**
- Verifica que `api.json` esté bien formado
- Revisa la consola del navegador (F12)

**Imágenes no aparecen:**
- Asegúrate que las imágenes estén en la carpeta correcta
- Usa el nombre correcto del producto (sin espacios especiales)

**WhatsApp no abre:**
- Verifica que el número de teléfono esté correcto
- Asegúrate de tener WhatsApp Web instalado

### 📞 Soporte

Para soporte técnico:
- WhatsApp: +57 318 874 8237
- Instagram: @nikolle_puntaditas
