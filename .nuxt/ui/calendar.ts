const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

export default {
  "slots": {
    "root": "",
    "header": "flex items-center justify-between",
    "body": "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
    "heading": "text-center font-medium truncate mx-auto",
    "grid": "w-full border-collapse select-none space-y-1 focus:outline-none",
    "gridRow": "grid grid-cols-7",
    "gridWeekDaysRow": "mb-1 grid w-full grid-cols-7",
    "gridBody": "grid",
    "headCell": "rounded-[calc(var(--ui-radius)*1.5)]",
    "cell": "relative text-center",
    "cellTrigger": [
      "m-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-(--ui-text-muted) data-unavailable:line-through data-unavailable:text-(--ui-text-muted) data-unavailable:pointer-events-none data-[selected]:text-(--ui-bg) data-today:font-semibold",
      "transition"
    ]
  },
  "variants": {
    "color": {
      "primary": {
        "headCell": "text-(--ui-primary)",
        "cellTrigger": "focus-visible:ring-(--ui-primary) data-[selected]:bg-(--ui-primary) data-today:not-data-[selected]:text-(--ui-primary) data-[highlighted]:bg-(--ui-primary)/20 hover:not-data-[selected]:bg-(--ui-primary)/20"
      },
      "secondary": {
        "headCell": "text-(--ui-secondary)",
        "cellTrigger": "focus-visible:ring-(--ui-secondary) data-[selected]:bg-(--ui-secondary) data-today:not-data-[selected]:text-(--ui-secondary) data-[highlighted]:bg-(--ui-secondary)/20 hover:not-data-[selected]:bg-(--ui-secondary)/20"
      },
      "success": {
        "headCell": "text-(--ui-success)",
        "cellTrigger": "focus-visible:ring-(--ui-success) data-[selected]:bg-(--ui-success) data-today:not-data-[selected]:text-(--ui-success) data-[highlighted]:bg-(--ui-success)/20 hover:not-data-[selected]:bg-(--ui-success)/20"
      },
      "info": {
        "headCell": "text-(--ui-info)",
        "cellTrigger": "focus-visible:ring-(--ui-info) data-[selected]:bg-(--ui-info) data-today:not-data-[selected]:text-(--ui-info) data-[highlighted]:bg-(--ui-info)/20 hover:not-data-[selected]:bg-(--ui-info)/20"
      },
      "warning": {
        "headCell": "text-(--ui-warning)",
        "cellTrigger": "focus-visible:ring-(--ui-warning) data-[selected]:bg-(--ui-warning) data-today:not-data-[selected]:text-(--ui-warning) data-[highlighted]:bg-(--ui-warning)/20 hover:not-data-[selected]:bg-(--ui-warning)/20"
      },
      "error": {
        "headCell": "text-(--ui-error)",
        "cellTrigger": "focus-visible:ring-(--ui-error) data-[selected]:bg-(--ui-error) data-today:not-data-[selected]:text-(--ui-error) data-[highlighted]:bg-(--ui-error)/20 hover:not-data-[selected]:bg-(--ui-error)/20"
      },
      "neutral": {
        "headCell": "text-(--ui-bg-inverted)",
        "cellTrigger": "focus-visible:ring-(--ui-border-inverted) data-[selected]:bg-(--ui-bg-inverted) data-today:not-data-[selected]:text-(--ui-bg-inverted) data-[highlighted]:bg-(--ui-bg-inverted)/20 hover:not-data-[selected]:bg-(--ui-bg-inverted)/10"
      }
    },
    "size": {
      "xs": {
        "heading": "text-xs",
        "cell": "text-xs",
        "headCell": "text-[10px]",
        "cellTrigger": "size-7",
        "body": "space-y-2 pt-2"
      },
      "sm": {
        "heading": "text-xs",
        "headCell": "text-xs",
        "cell": "text-xs",
        "cellTrigger": "size-7"
      },
      "md": {
        "heading": "text-sm",
        "headCell": "text-xs",
        "cell": "text-sm",
        "cellTrigger": "size-8"
      },
      "lg": {
        "heading": "text-md",
        "headCell": "text-md",
        "cellTrigger": "size-9 text-md"
      },
      "xl": {
        "heading": "text-lg",
        "headCell": "text-lg",
        "cellTrigger": "size-10 text-lg"
      }
    }
  },
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number]
  }
}