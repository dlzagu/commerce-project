import { Category } from '@prisma/client'
import { useCallback } from 'react'
import Button from '../Button'

interface CategoryInfoProps {
  category: Category
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  onAction?: (id: string) => void
}

const CategoryInfo: React.FC<CategoryInfoProps> = ({
  category,
  disabled,
  actionLabel = '',
  actionId = '',
  onAction,
}) => {
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [disabled, onAction, actionId]
  )

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="font-semibold text-lg">{category?.name}</div>
        <div className="font-light text-neutral-500">
          {category?.description}
        </div>

        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      </div>
    </div>
  )
}
