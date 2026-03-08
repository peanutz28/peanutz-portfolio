'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export function useTheme() {
  const { theme, setTheme } = useNextTheme()
  
  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return { theme: theme as "dark" | "light", toggleTheme, setTheme }
}
