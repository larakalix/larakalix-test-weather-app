# Weather App

Una aplicación simple de clima construida con **Next.js** que permite a los usuarios buscar el clima actual de cualquier ciudad.

La aplicación utiliza **weatherapi.com** para obtener información del clima, como:

* Temperatura actual
* Humedad
* Descripción del clima
* Ícono del clima
* Información de la ciudad

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js
* pnpm, npm o yarn
* Una API key de weatherapi.com

Puedes crear una API key gratuita desde:

```txt
https://www.weatherapi.com/
```

## Primeros pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/larakalix/larakalix-test-weather-app
cd weather-app
```

### 2. Instalar dependencias

Usando pnpm:

```bash
pnpm install
```

O usando npm:

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env | .env.local` en la raíz del proyecto:

```bash
touch .env | touch .env.local
```

Luego agrega las siguientes variables de entorno:

```env
API_KEY=tu_weather_api_key
API_URL=https://api.weatherapi.com/v1/current.json
```

Reemplaza `tu_weather_api_key` con tu API key real de WeatherAPI.com.

Ejemplo:

```env
API_KEY=abc123examplekey
API_URL=https://api.weatherapi.com/v1/current.json
```

### 4. Ejecutar el servidor de desarrollo

Usando pnpm:

```bash
pnpm dev
```

O usando npm:

```bash
npm run dev
```

La aplicación debería estar disponible en:

```txt
http://localhost:3000
```

## Cómo usar la aplicación

1. Abre la aplicación en el navegador.
2. Ingresa el nombre de una ciudad en la barra de búsqueda.
3. Haz clic en el botón **Search**.
4. La aplicación mostrará la información del clima actual para esa ciudad.

Ejemplos de búsqueda:

```txt
London
New York
Madrid
Tokyo
Managua
```

Si la ciudad no se encuentra, la aplicación mostrará un mensaje de error.

## Variables de entorno

| Variable  | Descripción                                |
| --------- | ------------------------------------------ |
| `API_KEY` | Tu API key de WeatherAPI.com               |
| `API_URL` | Endpoint de clima actual de WeatherAPI.com |

Valor requerido para `API_URL`:

```env
API_URL=https://api.weatherapi.com/v1/current.json
```

## Funcionamiento del proyecto

Cuando la página recibe una ciudad en los parámetros de la URL, obtiene la información del clima desde el servidor.

Ejemplo:

```txt
http://localhost:3000?city=London
```

Si no se proporciona una ciudad, la aplicación muestra un estado vacío indicando que el usuario debe buscar una ciudad.

Si la ciudad no es válida o la petición al API falla, la aplicación muestra un mensaje de error.


## Ejecutar pruebas

Si el proyecto incluye pruebas unitarias, puedes ejecutarlas con:

Usando pnpm:

```bash
pnpm test
```

O usando npm:

```bash
npm run test
```
