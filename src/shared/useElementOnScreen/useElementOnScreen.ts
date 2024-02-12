import { useEffect, useRef, useState } from "react"

export const useElementOnScreen = (options: {
    root: null,
    rootMargin: string,
    treshold: number
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    const callbackFunction = (entries: any) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)
        if (containerRef.current) observer.observe(containerRef.current)

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef, options])

    return {containerRef, isVisible}
}
