// Performance optimization wrapper - disables all animations
import { MotionConfig } from "framer-motion"

export default function PerformanceWrapper({ children }) {
    return (
        <MotionConfig reducedMotion="always">
            {children}
        </MotionConfig>
    )
}
