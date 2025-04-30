"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  CuboidIcon as Cube,
  Users,
  Settings,
  Bell,
  Menu,
  ChevronLeft,
  X,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  TrendingUp,
  UserCheck,
  ShoppingCart,
  Eye,
  Moon,
  Sun,
  Search,
  Filter,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

export default function Dashboard() {
  // Estado para el tema oscuro
  const [darkMode, setDarkMode] = useState(false)
  // Estado para la vista actual
  const [currentView, setCurrentView] = useState("Dashboard")
  // Estado para el menú lateral (cerrado por defecto en móvil)
  const [menuOpen, setMenuOpen] = useState(() => {
    // Verificar si estamos en el cliente y si la pantalla es lo suficientemente ancha
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 // md breakpoint en Tailwind
    }
    return true // Por defecto abierto en SSR
  })
  // Estados para menús móviles
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  // Estado para búsqueda de usuarios
  const [searchTerm, setSearchTerm] = useState("")
  // Estado para filtro de notificaciones
  const [notificationFilter, setNotificationFilter] = useState("all")

  // Efecto para detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMenuOpen(false)
      } else {
        setMenuOpen(true)
      }
    }

    // Configurar listener para cambios de tamaño
    window.addEventListener("resize", handleResize)

    // Llamar una vez para configurar el estado inicial
    handleResize()

    // Limpiar listener al desmontar
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Efecto para aplicar el tema oscuro al body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Datos simulados para el gráfico de ventas
  const salesData = [
    { name: "Lun", ventas: 4000, usuarios: 2400 },
    { name: "Mar", ventas: 3000, usuarios: 1398 },
    { name: "Mié", ventas: 2000, usuarios: 9800 },
    { name: "Jue", ventas: 2780, usuarios: 3908 },
    { name: "Vie", ventas: 1890, usuarios: 4800 },
    { name: "Sáb", ventas: 2390, usuarios: 3800 },
    { name: "Dom", ventas: 3490, usuarios: 4300 },
  ]

  // Datos simulados para el gráfico de usuarios
  const userData = [
    { name: "Ene", activos: 4000, nuevos: 2400 },
    { name: "Feb", activos: 3000, nuevos: 1398 },
    { name: "Mar", activos: 2000, nuevos: 9800 },
    { name: "Abr", activos: 2780, nuevos: 3908 },
    { name: "May", activos: 1890, nuevos: 4800 },
    { name: "Jun", activos: 2390, nuevos: 3800 },
  ]

  // Datos simulados para el gráfico de retención
  const retentionData = [
    { name: "Sem 1", valor: 65 },
    { name: "Sem 2", valor: 59 },
    { name: "Sem 3", valor: 80 },
    { name: "Sem 4", valor: 81 },
    { name: "Sem 5", valor: 56 },
    { name: "Sem 6", valor: 55 },
    { name: "Sem 7", valor: 40 },
  ]

  // Datos de usuarios para la sección de usuarios
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
      role: "Admin",
      status: "Activo",
    },
    {
      id: 2,
      name: "María López",
      email: "maria@ejemplo.com",
      role: "Usuario",
      status: "Activo",
    },
    {
      id: 3,
      name: "Carlos Gómez",
      email: "carlos@ejemplo.com",
      role: "Usuario",
      status: "Inactivo",
    },
    {
      id: 4,
      name: "Ana Rodríguez",
      email: "ana@ejemplo.com",
      role: "Editor",
      status: "Activo",
    },
    {
      id: 5,
      name: "Roberto Fernández",
      email: "roberto@ejemplo.com",
      role: "Usuario",
      status: "Inactivo",
    },
  ])

  // Estado de notificaciones con ejemplos más detallados
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      title: "Nueva actualización disponible",
      message: "La versión 2.1.0 está lista para instalar con nuevas funcionalidades.",
      time: "hace 5 min",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Exportación completada",
      message: "Los datos han sido exportados correctamente a formato CSV.",
      time: "hace 15 min",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Espacio de almacenamiento",
      message: "Está utilizando el 90% del espacio disponible.",
      time: "hace 1 hora",
      read: true,
    },
    {
      id: 4,
      type: "error",
      title: "Error de conexión",
      message: "No se pudo conectar con el servidor de base de datos.",
      time: "hace 2 horas",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "Recordatorio de reunión",
      message: "Tiene una reunión programada con el equipo de desarrollo mañana a las 10:00 AM.",
      time: "hace 3 horas",
      read: true,
    },
  ])

  // Función para generar notificaciones aleatorias
  const generateRandomNotification = () => {
    // Tipos de notificaciones posibles
    const types = ["info", "success", "warning", "error"]
    const type = types[Math.floor(Math.random() * types.length)]

    // Títulos según el tipo
    const titles = {
      info: ["Nueva actualización", "Recordatorio", "Información importante", "Aviso del sistema"],
      success: ["Operación completada", "Tarea finalizada", "Proceso exitoso", "Datos guardados"],
      warning: ["Atención requerida", "Advertencia del sistema", "Espacio limitado", "Rendimiento bajo"],
      error: ["Error detectado", "Fallo en el sistema", "Conexión perdida", "Acceso denegado"],
    }

    // Mensajes según el tipo
    const messages = {
      info: [
        "Hay una nueva versión disponible para instalar.",
        "Reunión programada para mañana.",
        "Se han actualizado los términos de servicio.",
        "Revise la documentación actualizada.",
      ],
      success: [
        "Los datos se han guardado correctamente.",
        "La exportación ha finalizado con éxito.",
        "El informe ha sido enviado.",
        "La tarea se completó sin errores.",
      ],
      warning: [
        "El espacio de almacenamiento está al 90%.",
        "El rendimiento del sistema está disminuyendo.",
        "Algunas funciones podrían no estar disponibles.",
        "Se requiere mantenimiento próximamente.",
      ],
      error: [
        "No se pudo conectar con el servidor.",
        "Error al procesar la solicitud.",
        "Fallo en la autenticación.",
        "Los datos no pudieron ser recuperados.",
      ],
    }

    // Seleccionar título y mensaje aleatorios según el tipo
    const title = titles[type][Math.floor(Math.random() * titles[type].length)]
    const message = messages[type][Math.floor(Math.random() * messages[type].length)]

    // Obtener la hora actual formateada
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // Crear la notificación
    return {
      id: Date.now(), // ID único basado en timestamp
      type,
      title,
      message,
      time: `hace un momento (${currentTime})`,
      read: false,
    }
  }

  // Función para añadir una nueva notificación
  const addNotification = () => {
    const newNotification = generateRandomNotification()
    setNotifications((prev) => [newNotification, ...prev])

    // Eliminamos la reproducción de sonido que causaba el error
  }

  // Efecto para generar notificaciones automáticas
  useEffect(() => {
    // Intervalo para generar notificaciones automáticas cada 15 segundos
    const notificationInterval = setInterval(() => {
      addNotification()
    }, 15000)

    // Limpiar el intervalo al desmontar
    return () => clearInterval(notificationInterval)
  }, [])

  // Marcar notificación como leída
  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  // Eliminar notificación
  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  // Filtrar notificaciones según el tipo seleccionado
  const filteredNotifications = notifications.filter(
    (notification) => notificationFilter === "all" || notification.type === notificationFilter,
  )

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter((n) => !n.read).length

  // Componente para el Dashboard
  const DashboardSection = () => {
    // Estados para los KPIs que se actualizarán en tiempo real
    const [kpis, setKpis] = useState({
      usuariosActivos: 1245,
      ventasMensuales: 32500,
      tasaRetencion: 85,
      usuariosEnLinea: 50,
      visitasHoy: 1876,
      conversionRate: 3.2,
    })

    // Estados para los datos de los gráficos
    const [realtimeSalesData, setRealtimeSalesData] = useState([
      { name: "Lun", ventas: 4000, usuarios: 2400 },
      { name: "Mar", ventas: 3000, usuarios: 1398 },
      { name: "Mié", ventas: 2000, usuarios: 9800 },
      { name: "Jue", ventas: 2780, usuarios: 3908 },
      { name: "Vie", ventas: 1890, usuarios: 4800 },
      { name: "Sáb", ventas: 2390, usuarios: 3800 },
      { name: "Dom", ventas: 3490, usuarios: 4300 },
    ])

    const [realtimeUserData, setRealtimeUserData] = useState([
      { name: "Ene", activos: 4000, nuevos: 2400 },
      { name: "Feb", activos: 3000, nuevos: 1398 },
      { name: "Mar", activos: 2000, nuevos: 9800 },
      { name: "Abr", activos: 2780, nuevos: 3908 },
      { name: "May", activos: 1890, nuevos: 4800 },
      { name: "Jun", activos: 2390, nuevos: 3800 },
    ])

    const [realtimeRetentionData, setRealtimeRetentionData] = useState([
      { name: "Sem 1", valor: 65 },
      { name: "Sem 2", valor: 59 },
      { name: "Sem 3", valor: 80 },
      { name: "Sem 4", valor: 81 },
      { name: "Sem 5", valor: 56 },
      { name: "Sem 6", valor: 55 },
      { name: "Sem 7", valor: 40 },
    ])

    // Estado para el gráfico en tiempo real
    const [realtimeData, setRealtimeData] = useState([
      { time: "00:00", valor: 30 },
      { time: "00:05", valor: 35 },
      { time: "00:10", valor: 40 },
      { time: "00:15", valor: 38 },
      { time: "00:20", valor: 42 },
    ])

    // Función para generar un valor aleatorio dentro de un rango
    const getRandomValue = (base, variance) => {
      return Math.floor(base + Math.random() * variance * 2 - variance)
    }

    // Función para obtener la hora actual formateada
    const getCurrentTime = () => {
      const now = new Date()
      return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
    }

    // Efecto para actualizar los datos en tiempo real
    useEffect(() => {
      // Intervalo para actualizar KPIs
      const kpiInterval = setInterval(() => {
        setKpis((prevKpis) => ({
          usuariosActivos: getRandomValue(prevKpis.usuariosActivos, 10),
          ventasMensuales: getRandomValue(prevKpis.ventasMensuales, 100),
          tasaRetencion: Math.min(100, Math.max(0, getRandomValue(prevKpis.tasaRetencion, 1))),
          usuariosEnLinea: getRandomValue(prevKpis.usuariosEnLinea, 5),
          visitasHoy: getRandomValue(prevKpis.visitasHoy, 20),
          conversionRate: Number.parseFloat((prevKpis.conversionRate + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        }))
      }, 2000) // Actualizar cada 2 segundos

      // Intervalo para actualizar el gráfico en tiempo real
      const realtimeChartInterval = setInterval(() => {
        setRealtimeData((prevData) => {
          // Crear un nuevo punto de datos
          const newPoint = {
            time: getCurrentTime(),
            valor: getRandomValue(40, 15),
          }

          // Mantener solo los últimos 10 puntos
          const newData = [...prevData.slice(-9), newPoint]
          return newData
        })
      }, 1000) // Actualizar cada segundo

      // Intervalo para actualizar los datos de ventas
      const salesDataInterval = setInterval(() => {
        setRealtimeSalesData((prevData) => {
          // Crear una copia profunda para no mutar el estado original
          return prevData.map((item) => ({
            ...item,
            ventas: getRandomValue(item.ventas, item.ventas * 0.05),
            usuarios: getRandomValue(item.usuarios, item.usuarios * 0.05),
          }))
        })
      }, 3000) // Actualizar cada 3 segundos

      // Intervalo para actualizar los datos de retención
      const retentionDataInterval = setInterval(() => {
        setRealtimeRetentionData((prevData) => {
          return prevData.map((item) => ({
            ...item,
            valor: Math.min(100, Math.max(0, getRandomValue(item.valor, 3))),
          }))
        })
      }, 4000) // Actualizar cada 4 segundos

      // Limpiar intervalos al desmontar
      return () => {
        clearInterval(kpiInterval)
        clearInterval(realtimeChartInterval)
        clearInterval(salesDataInterval)
        clearInterval(retentionDataInterval)
      }
    }, []) // Solo ejecutar al montar el componente

    // Formato para números
    const formatNumber = (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K"
      }
      return num
    }

    // Formato para moneda
    const formatCurrency = (num) => {
      return "$" + formatNumber(num)
    }

    return (
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white">Dashboard</h1>

        {/* Tarjetas de métricas clave */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-5 border-l-4 border-blue-500 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuarios Activos</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  {formatNumber(kpis.usuariosActivos)}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5.3% desde el mes pasado
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-5 border-l-4 border-green-500 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ventas Mensuales</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(kpis.ventasMensuales)}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2.4% desde el mes pasado
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-5 border-l-4 border-purple-500 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasa de Retención</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{kpis.tasaRetencion}%</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" /> -1.2% desde el mes pasado
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <UserCheck className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
          </div>
        </div>

        {/* KPIs en tiempo real */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center transition-all duration-300">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4">
              <Eye className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuarios en línea</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{kpis.usuariosEnLinea}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center transition-all duration-300">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-4">
              <Activity className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visitas hoy</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                {formatNumber(kpis.visitasHoy)}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center transition-all duration-300">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full mr-4">
              <ShoppingCart className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasa de conversión</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{kpis.conversionRate}%</p>
            </div>
          </div>
        </div>

        {/* Gráfico en tiempo real */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium dark:text-white">Actividad en tiempo real</h2>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Actualizando en vivo</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="time" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis domain={[0, 100]} stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    borderColor: darkMode ? "#374151" : "#e5e7eb",
                    color: darkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={300}
                  name="Actividad"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium dark:text-white">Ventas de la semana</h2>
              <select className="text-sm border rounded p-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
                <option>Último trimestre</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={realtimeSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                  <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#f9fafb" : "#111827",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorVentas)"
                    name="Ventas ($)"
                    isAnimationActive={true}
                    animationDuration={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium dark:text-white">Tasa de retención</h2>
              <select className="text-sm border rounded p-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <option>Últimas 7 semanas</option>
                <option>Últimos 6 meses</option>
                <option>Último año</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={realtimeRetentionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                  <YAxis domain={[0, 100]} stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Retención"]}
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#f9fafb" : "#111827",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="valor"
                    fill={darkMode ? "#a78bfa" : "#8884d8"}
                    name="Retención (%)"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráfico adicional */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium dark:text-white">Usuarios activos vs. nuevos</h2>
            <select className="text-sm border rounded p-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeUserData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    borderColor: darkMode ? "#374151" : "#e5e7eb",
                    color: darkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activos"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Usuarios activos"
                  isAnimationActive={true}
                  animationDuration={300}
                />
                <Line
                  type="monotone"
                  dataKey="nuevos"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Usuarios nuevos"
                  isAnimationActive={true}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  // Componente para la visualización 3D
  const ThreeDSection = () => {
    // Componente para el cubo giratorio
    const RotatingCube = () => {
      const meshRef = useRef()

      // Usar useFrame para actualizar la rotación en cada frame
      useFrame((state, delta) => {
        if (meshRef.current) {
          meshRef.current.rotation.x += delta * 0.5
          meshRef.current.rotation.y += delta * 0.3
        }
      })

      return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.2} />
        </mesh>
      )
    }

    // Componente para una esfera
    const AnimatedSphere = () => {
      const sphereRef = useRef()

      useFrame((state, delta) => {
        if (sphereRef.current) {
          sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
          sphereRef.current.rotation.z += delta * 0.3
        }
      })

      return (
        <mesh ref={sphereRef} position={[-3, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#10B981" metalness={0.2} roughness={0.3} />
        </mesh>
      )
    }

    // Componente para un toro (donut)
    const AnimatedTorus = () => {
      const torusRef = useRef()

      useFrame((state, delta) => {
        if (torusRef.current) {
          torusRef.current.rotation.x += delta * 0.2
          torusRef.current.rotation.y += delta * 0.4
        }
      })

      return (
        <mesh ref={torusRef} position={[3, 0, 0]}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.3} roughness={0.4} />
        </mesh>
      )
    }

    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white">Visualización 3D</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="h-[50vh] md:h-[calc(100vh-220px)] w-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              {/* Luces */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />

              {/* Objetos 3D */}
              <RotatingCube />
              <AnimatedSphere />
              <AnimatedTorus />

              {/* Fondo y controles */}
              <Environment preset="city" />
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={3} maxDistance={20} />
            </Canvas>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Cubo Interactivo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Un cubo 3D con rotación automática y material metálico.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Esfera Animada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Una esfera que se mueve verticalmente con un patrón sinusoidal.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Toro Giratorio</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Un toro (forma de donut) con rotación en múltiples ejes.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Controles</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>
                • <span className="font-medium">Rotar vista:</span> Clic izquierdo + arrastrar
              </li>
              <li>
                • <span className="font-medium">Zoom:</span> Rueda del ratón
              </li>
              <li>
                • <span className="font-medium">Mover cámara:</span> Clic derecho + arrastrar
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Componente para la sección de usuarios
  const UsersSection = () => {
    // Filtrar usuarios según el término de búsqueda
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white">Gestión de Usuarios</h2>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="overflow-x-auto">
            {filteredUsers.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "Activo"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No se encontraron usuarios con esos criterios.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Componente para la sección de ajustes
  const SettingsSection = () => {
    // Estado local para los ajustes
    const [appName, setAppName] = useState("Mi Dashboard")
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(true)

    // Función para guardar los cambios
    const saveSettings = () => {
      // Aquí se implementaría la lógica para guardar los ajustes
      alert("Configuración guardada correctamente")
    }

    return (
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white">Configuración</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ajustes generales */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 dark:text-white">Ajustes generales</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre de la aplicación
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm p-2 border dark:bg-gray-700 dark:text-white"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tema</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDarkMode(false)}
                    className={`flex items-center justify-center p-2 rounded-md ${!darkMode ? "bg-blue-100 text-blue-700 border-2 border-blue-500" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent"}`}
                  >
                    <Sun className="h-5 w-5 mr-2" />
                    <span>Claro</span>
                  </button>

                  <button
                    onClick={() => setDarkMode(true)}
                    className={`flex items-center justify-center p-2 rounded-md ${darkMode ? "bg-blue-100 text-blue-700 border-2 border-blue-500 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent"}`}
                  >
                    <Moon className="h-5 w-5 mr-2" />
                    <span>Oscuro</span>
                  </button>
                </div>
              </div>

              {/* Toggle de tema oscuro */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="mr-3">Modo oscuro</span>
                  </label>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      className="sr-only"
                    />
                    <div className="block bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full"></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${darkMode ? "translate-x-6" : ""}`}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Activa el modo oscuro para reducir la fatiga visual en entornos con poca luz.
                </p>
              </div>
            </div>
          </div>

          {/* Ajustes de notificaciones */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 dark:text-white">Notificaciones</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Canales de notificación
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <label
                      htmlFor="email-notifications"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                    />
                    <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Push
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frecuencia de resumen
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm p-2 border dark:bg-gray-700 dark:text-white">
                  <option>Diario</option>
                  <option>Semanal</option>
                  <option>Mensual</option>
                  <option>Nunca</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de privacidad */}
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Privacidad y datos</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="data-collection"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                defaultChecked
              />
              <label htmlFor="data-collection" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Permitir recopilación de datos de uso anónimos
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="personalized-content"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                defaultChecked
              />
              <label htmlFor="personalized-content" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Mostrar contenido personalizado
              </label>
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={saveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    )
  }

  // Renderizar la sección actual basada en el estado
  const renderCurrentView = () => {
    switch (currentView) {
      case "Dashboard":
        return <DashboardSection />
      case "Visualizacion3D":
        return <ThreeDSection />
      case "Usuarios":
        return <UsersSection />
      case "Ajustes":
        return <SettingsSection />
      default:
        return <DashboardSection />
    }
  }

  // Opciones de navegación con sus íconos
  const navOptions = [
    { id: "Dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { id: "Visualizacion3D", label: "Visualización 3D", icon: <Cube className="h-5 w-5" /> },
    { id: "Usuarios", label: "Usuarios", icon: <Users className="h-5 w-5" /> },
    { id: "Ajustes", label: "Ajustes", icon: <Settings className="h-5 w-5" /> },
  ]

  // Obtener el ícono según el tipo de notificación
  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Obtener el color de borde según el tipo de notificación
  const getNotificationBorderColor = (type) => {
    switch (type) {
      case "info":
        return "border-l-blue-500"
      case "success":
        return "border-l-green-500"
      case "warning":
        return "border-l-yellow-500"
      case "error":
        return "border-l-red-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div
      className={`flex h-screen ${darkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
    >
      {/* Menú lateral izquierdo con animación */}
      <motion.aside
        initial={{ width: menuOpen ? 240 : 80 }}
        animate={{ width: menuOpen ? 240 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white dark:bg-gray-800 shadow-md z-10 hidden md:block border-r border-gray-200 dark:border-gray-700"
      >
        {/* Encabezado del menú */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <motion.div
            initial={{ opacity: menuOpen ? 1 : 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`font-bold text-xl dark:text-white ${menuOpen ? "block" : "hidden"}`}
          >
            Mi Dashboard
          </motion.div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={menuOpen ? "Colapsar menú" : "Expandir menú"}
          >
            <ChevronLeft className={`h-5 w-5 transition-transform dark:text-white ${menuOpen ? "" : "rotate-180"}`} />
          </button>
        </div>

        {/* Opciones de navegación */}
        <nav className="p-2">
          <ul className="space-y-2">
            {navOptions.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => setCurrentView(option.id)}
                  className={`w-full flex items-center p-2 rounded-md transition-colors ${
                    currentView === option.id
                      ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex-shrink-0">{option.icon}</span>
                  {menuOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 whitespace-nowrap"
                    >
                      {option.label}
                    </motion.span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              aria-label="Menú"
            >
              <Menu className="h-5 w-5 dark:text-white" />
            </button>
            <h1 className="text-xl font-bold dark:text-white ml-2 md:ml-0">Mi Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5 dark:text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Menú móvil */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="font-bold text-xl dark:text-white">Mi Dashboard</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5 dark:text-white" />
                </button>
              </div>
              <nav className="p-2">
                <ul className="space-y-2">
                  {navOptions.map((option) => (
                    <li key={option.id}>
                      <button
                        onClick={() => {
                          setCurrentView(option.id)
                          setShowMobileMenu(false)
                        }}
                        className={`w-full flex items-center p-2 rounded-md transition-colors ${
                          currentView === option.id
                            ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="flex-shrink-0">{option.icon}</span>
                        <span className="ml-3">{option.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
        )}

        {/* Panel de notificaciones móvil */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg z-50"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="font-bold text-xl dark:text-white">Notificaciones</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={addNotification}
                    className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs flex items-center transition-colors"
                    aria-label="Añadir notificación"
                  >
                    <span className="mr-1">+</span> Nueva
                  </button>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Cerrar notificaciones"
                  >
                    <X className="h-5 w-5 dark:text-white" />
                  </button>
                </div>
              </div>

              {/* Filtro de notificaciones */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Filtrar:</span>
                  <select
                    value={notificationFilter}
                    onChange={(e) => setNotificationFilter(e.target.value)}
                    className="text-sm border rounded p-1 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  >
                    <option value="all">Todas</option>
                    <option value="info">Info</option>
                    <option value="success">Éxito</option>
                    <option value="warning">Advertencia</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  disabled={unreadCount === 0}
                >
                  Marcar leídas
                </button>
              </div>

              <div className="overflow-y-auto h-full pb-20">
                {filteredNotifications.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence initial={false}>
                      {filteredNotifications.map((notification) => (
                        <motion.li
                          key={notification.id}
                          initial={{ opacity: 0, y: -20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${notification.read ? "bg-white dark:bg-gray-800" : "bg-blue-50 dark:bg-blue-900/30"}`}
                        >
                          <div className={`border-l-4 pl-3 ${getNotificationBorderColor(notification.type)}`}>
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                <div className="mr-2 mt-0.5">{getNotificationIcon(notification.type)}</div>
                                <div>
                                  <h3 className="text-sm font-medium dark:text-white">{notification.title}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {notification.time}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                aria-label="Eliminar notificación"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                              >
                                Marcar como leída
                              </button>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                    <Bell className="h-8 w-8 mb-2 opacity-50" />
                    <p>No hay notificaciones</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Área de contenido principal */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">{renderCurrentView()}</main>
      </div>

      {/* Barra lateral de notificaciones (panel derecho) */}
      <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-hidden hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold dark:text-white">Notificaciones</h2>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {unreadCount} nuevas
              </span>
            )}
            <button
              onClick={addNotification}
              className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs flex items-center transition-colors"
              aria-label="Añadir notificación"
            >
              <span className="mr-1">+</span> Nueva
            </button>
          </div>
        </div>

        {/* Filtro de notificaciones */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <select
              value={notificationFilter}
              onChange={(e) => setNotificationFilter(e.target.value)}
              className="text-sm border rounded p-1 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            >
              <option value="all">Todas</option>
              <option value="info">Info</option>
              <option value="success">Éxito</option>
              <option value="warning">Advertencia</option>
              <option value="error">Error</option>
            </select>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            disabled={unreadCount === 0}
          >
            Marcar todas como leídas
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {filteredNotifications.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence initial={false}>
                {filteredNotifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${notification.read ? "bg-white dark:bg-gray-800" : "bg-blue-50 dark:bg-blue-900/30"}`}
                  >
                    <div className={`border-l-4 pl-3 ${getNotificationBorderColor(notification.type)}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mr-2 mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div>
                            <h3 className="text-sm font-medium dark:text-white">{notification.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                            <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          aria-label="Eliminar notificación"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Marcar como leída
                        </button>
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p>No hay notificaciones</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
