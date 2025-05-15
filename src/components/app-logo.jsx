import { Zap } from "lucide-react"

export default function AppLogo({ size = "default" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <div className={`bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-md p-1 text-primary-foreground ${sizeClasses[size]}`}>
      <Zap className="h-full w-full" />
    </div>
  )
}
