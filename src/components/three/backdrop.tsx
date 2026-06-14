import { lazy, Suspense, useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme'

const RibbonScene = lazy(() => import('@/components/three/ribbon-scene'))

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Fixed background layer. Always paints a CSS sunset-gradient fallback, then
 * mounts the lazy-loaded WebGL ribbon on top once it's ready (and supported).
 */
export function Backdrop() {
  const { theme } = useTheme()
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    // Defer the heavy 3D until the page is interactive so first paint stays fast.
    if (!webglAvailable()) return
    const id = window.setTimeout(() => setShow3D(true), 250)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <>
      <div className="backdrop-fallback" aria-hidden="true" />
      {show3D && (
        <Suspense fallback={null}>
          <RibbonScene theme={theme} />
        </Suspense>
      )}
    </>
  )
}
