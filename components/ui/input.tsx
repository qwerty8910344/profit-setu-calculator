import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, value, onChange, ...props }: React.ComponentProps<'input'>) {
  // Use local state to track the text value while typing to prevent cursor jumps and leading zero issues
  const [localValue, setLocalValue] = React.useState<string>(
    type === 'number' && Number(value) === 0 ? "" : (value?.toString() ?? "")
  )

  // Sync with prop value only when it changes externally
  React.useEffect(() => {
    // If value is 0 or empty, display as empty string to the user
    // Otherwise show the actual numeric value
    const formattedProp = (type === 'number' && (value === 0 || value === '0')) ? "" : (value?.toString() ?? "")
    
    // Safety check to prevent cursor jumps: only update local state if the numeric meaning has changed
    // OR if the formatted string is different and we aren't in a numeric context
    const isDifferentValue = formattedProp !== localValue && (type !== 'number' || Number(formattedProp) !== Number(localValue))
    
    // EXCEPT: If the prop is 0 and we are currently showing a non-empty value (like "0"), 
    // we MUST force it to "" to satisfy the "clear properly" requirement.
    const mustClear = type === 'number' && (value === 0 || value === '0') && localValue !== "" && Number(localValue) === 0
    
    if (isDifferentValue || mustClear) {
      setLocalValue(formattedProp)
    }
  }, [value, type])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    
    if (type === 'number') {
      // Prevent leading zeros (e.g., "01300" -> "1300")
      if (val.length > 1 && val.startsWith('0') && !val.startsWith('0.')) {
        val = val.replace(/^0+/, '')
        if (val === '') val = '0'
      }
      
      // Update local state first to ensure smooth typing
      setLocalValue(val)
      
      // Send the actual value (including empty string) to the parent
      if (onChange) {
        // We still use a masked event style to ensure the value is sanitized
        const maskedEvent = {
          ...e,
          target: { ...e.target, value: val }
        } as React.ChangeEvent<HTMLInputElement>
        onChange(maskedEvent)
      }
    } else {
      setLocalValue(val)
      if (onChange) onChange(e)
    }
  }

  return (
    <input
      type={type}
      value={localValue}
      onChange={handleChange}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
