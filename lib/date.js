import { parseISO, format } from 'date-fns'

export default function Date(dateString ) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, `EEEE, d MMMM yyyy `)}AT{format(date, ` HH:mm`)} </time>
}