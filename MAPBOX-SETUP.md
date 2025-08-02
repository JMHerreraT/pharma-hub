# 🗺️ Configuración de Mapbox

## ¿Por qué necesito configurar Mapbox?

El dashboard incluye mapas interactivos para visualizar las direcciones de entrega de los pedidos. Para que los mapas funcionen correctamente, necesitas un token de acceso gratuito de Mapbox.

## 📋 Pasos para configurar Mapbox

### 1. Crear cuenta en Mapbox (Gratis)
- Ve a [https://account.mapbox.com/](https://account.mapbox.com/)
- Regístrate con tu email
- La cuenta gratuita incluye **50,000 cargas de mapa por mes** - más que suficiente para un dashboard personal

### 2. Obtener tu token de acceso
- Una vez registrado, ve a [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
- Copia tu **Default public token** (comienza con `pk.`)

### 3. Configurar el token en tu proyecto
- Crea un archivo `.env.local` en la raíz del proyecto (al mismo nivel que `package.json`)
- Agrega la siguiente línea:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.tu_token_aqui_sin_espacios
```

### 4. Reiniciar el servidor
```bash
npm run dev
```

## 🎯 Resultado

Una vez configurado, verás mapas interactivos como este:

```
┌─────────────────────────────────┐
│ 📍 DIRECCIÓN DE ENTREGA         │
│ Av. Principal 123, Ciudad       │
│ ┌─────────────────────────────┐ │
│ │        🗺️ MAPA INTERACTIVO  │ │
│ │         📍 Marker azul      │ │
│ │    [+] [-] 🧭 Controles     │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## 🆘 ¿Problemas?

Si sigues viendo el mensaje "Token de Mapbox no configurado":

1. **Verifica el archivo `.env.local`:**
   - Debe estar en la raíz del proyecto
   - No debe tener espacios alrededor del `=`
   - El token debe empezar con `pk.`

2. **Reinicia el servidor:**
   ```bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   ```

3. **Verifica que el token sea válido:**
   - Ve a tu dashboard de Mapbox
   - Asegúrate de copiar el token completo

## 🔒 Seguridad

- El token público (`pk.`) es seguro para usar en frontend
- No compartas tokens secretos (`sk.`) en el código frontend
- Puedes restringir el uso del token a dominios específicos en Mapbox

## 💰 Costos

- **Cuenta gratuita:** 50,000 cargas de mapa/mes
- **Para uso personal:** Completamente gratis
- **Si excedes el límite:** ~$5 por 1,000 cargas adicionales

¡Listo! Con estos pasos tendrás mapas interactivos funcionando en tu dashboard. 🚀
