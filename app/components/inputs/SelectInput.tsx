'use client'

interface SelectBoxProps {
  description?: string
  actionLabel: string
  label: string
  selected?: boolean
  isCategory?: boolean
  onClick: (value: string) => void
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  selected,
  actionLabel,
  onClick,
  description,
}) => {
  return (
    <div
      onClick={() => onClick(actionLabel)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <div className="font-semibold">{label}</div>
      <div className="font-light text-neutral-500">{description}</div>
    </div>
  )
}

export default SelectBox
