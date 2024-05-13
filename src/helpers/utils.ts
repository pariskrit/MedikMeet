import { DropdownInterface } from 'ts/interfaces/formInterface'

export function formatDate(d: Date) {
  const date = new Date(d)
  let dd: number | string = date.getDate()
  let mm: number | string = date.getMonth() + 1
  const yyyy = date.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${yyyy}-${mm}-${dd}`
}

export const getDropdownFormat = (data: any) =>
  data.map((item: DropdownInterface) => ({
    label: item?.name ?? item?.route_type,
    value: item?.id,
  }))

export const handleTabArrowClick = (index: number, arrowDirection: string, setIndex: (param: number) => void, routes: any) => {

  if (index === 0 && arrowDirection === 'left' || index === routes.length - 1 && arrowDirection === 'right')
    return;

  if (arrowDirection === 'right')
    setIndex(index + 1)
  else
    setIndex(index - 1);

}

