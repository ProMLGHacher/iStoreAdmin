import { useState, useCallback, useEffect } from "react"

export const useContainerDimensions = (myRef: React.RefObject<HTMLElement | null>) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const handleResize = useCallback(() => {
        if (!myRef.current) return
        setWidth(myRef.current.clientWidth)
        setHeight(myRef.current.clientWidth)
    }, [myRef])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('load', handleResize)
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef, handleResize])

    return { width, height }
}