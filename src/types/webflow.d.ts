import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    [key: string]: any
  }
  interface SVGAttributes<T> {
    [key: string]: any
  }
}
