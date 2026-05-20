interface TagProps {
  children: React.ReactNode
  className?: string
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block font-mono text-[11px] text-[#888480] border border-[#333] px-2 py-1 rounded-sm tracking-wider uppercase ${className}`}
    >
      {children}
    </span>
  )
}
