import * as React from "react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
}

interface DialogTitleProps {
  children: React.ReactNode
}

interface DialogCloseProps {
  onClick: () => void
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false)
        }
      }}
    >
      {children}
    </div>
  )
}

export const DialogContent = ({ children, className = "" }: DialogContentProps) => (
  <div
    className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className}`}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
)

export const DialogHeader = ({ children }: DialogHeaderProps) => (
  <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-200 px-6 py-4 flex items-center justify-between">
    {children}
  </div>
)

export const DialogTitle = ({ children }: DialogTitleProps) => (
  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
    {children}
  </h2>
)

export const DialogClose = ({ onClick }: DialogCloseProps) => (
  <button
    onClick={onClick}
    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
)
