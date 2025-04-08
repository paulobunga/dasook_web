"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  date?: DateRange | undefined
  setDate?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({ className, date, setDate }: DatePickerWithRangeProps) {
  const [dateValue, setDateValue] = React.useState<DateRange | undefined>(
    date || {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  )

  React.useEffect(() => {
    if (date) {
      setDateValue(date)
    }
  }, [date])

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDateValue(newDate)
    if (setDate) {
      setDate(newDate)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !dateValue && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue?.from ? (
              dateValue.to ? (
                <>
                  {format(dateValue.from, "LLL dd, y")} - {format(dateValue.to, "LLL dd, y")}
                </>
              ) : (
                format(dateValue.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateValue?.from}
            selected={dateValue}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Add the missing export
export function CalendarDateRangePicker({ className }: { className?: string }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <DatePickerWithRange date={date} setDate={setDate} />
    </div>
  )
}
