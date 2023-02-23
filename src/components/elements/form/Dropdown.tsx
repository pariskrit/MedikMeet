import * as React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { backgroundColor, borderColor, errorColor, textColor } from 'styles/colors'
import { dropdownItems } from 'ts/types'
import { isEmpty } from 'utils'

interface IDropdownProps {
  value: any
  items?: Array<dropdownItems>
  setValue?: Function
  setItems?: Function
  error?: string
  styles?: Object
  mutiple?: boolean
  prefixIcon?: React.ReactElement | null
  placeholder?: string
  searchable?: boolean
}

const defaultProps = {
  items: [],
  setValue: () => {},
  setItems: () => {},
  error: '',
  styles: {},
  multiple: false,
  prefixIcon: null,
  placeholder: '',
  searchable: false,
}
const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const [open, setOpen] = React.useState(false)
  const {
    value,
    items,
    setItems,
    setValue,
    error,
    styles,
    mutiple,
    prefixIcon,
    placeholder,
    searchable,
  } = props
  const [drpItems, setDrpItems] = React.useState(items)
  React.useEffect(() => {
    const newDrpItems = []
    if (!isEmpty(prefixIcon)) {
      const prefixIconList = {
        label: placeholder || '',
        value: '',
        icon: () => prefixIcon,
        containerStyle: {
          display: 'none',
        }
      }
      newDrpItems.push(prefixIconList)
    }
    items?.map((x) => newDrpItems.push(x))
    setDrpItems(newDrpItems)
  }, [])

  const updateDrpItems = React.useCallback((open: boolean) => {
    const newDrpItems = []
    if (!isEmpty(prefixIcon)) {
      const prefixIconList = {
        label: placeholder || '',
        value: '',
        icon: () => prefixIcon,
        containerStyle: {
          display: 'none',
        },
      }
      newDrpItems.push(prefixIconList)
    }
    items?.map((x) => {
      let o = { ...x }
      if (!open && !isEmpty(prefixIcon) && isEmpty(o.icon)) {
        o.icon = () => prefixIcon
      }
      newDrpItems.push(o)
    })
       setDrpItems(newDrpItems)
  }, [])

  return (
    <DropDownPicker
      open={open}
      value={isEmpty(value) && !isEmpty(prefixIcon) ? '' : value}
      items={drpItems || []}
      setOpen={setOpen}
      setValue={(callback) => {
        if (setValue) setValue(callback(''))
       //updateDrpItems(false)
      }}
      setItems={(li) => {
        //if (setItems) setItems(li)
      }}
      //onOpen={() => updateDrpItems(true)}
      style={{
        ...styles,
        borderColor: !isEmpty(error) ? errorColor : borderColor,
        backgroundColor: backgroundColor,
      }}
      multiple={mutiple}
      placeholder={placeholder}
      listItemLabelStyle={{
        color: textColor,
      }}
      selectedItemLabelStyle={{
        color: textColor,
      }}
      searchable={searchable}
      dropDownContainerStyle={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      placeholderStyle={{ color: textColor }}
      textStyle={{ color: textColor }}
      //   selectedItemContainerStyle={{
      //     backgroundColor: 'grey',
      //     display: value === '' ? 'none' : 'flex',
      //   }}
    />
  )
}
Dropdown.defaultProps = defaultProps

export default Dropdown
