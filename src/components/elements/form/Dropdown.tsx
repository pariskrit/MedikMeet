import * as React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { HelperText } from 'react-native-paper'
import { backgroundColor, borderColor, errorColor, primaryColor, textColor } from 'styles/colors'
import { dropdownItems } from 'ts/types'
import { isEmpty } from 'utils'
import InputEl from './InputEl'

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
  zIndex?: number
  isRequired?: boolean
  zIndexInverse?: number
  name?: string
  isLoading?: boolean
  listMode?: 'SCROLLVIEW' | 'FLATLIST' | 'MODAL'
  scroll?: boolean
  adjustScrollMargin?: boolean
  index?: number
  onOpen?: Function
  onClose?: Function
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
  zIndex: 100,
  isRequired: false,
  zIndexInverse: 100,
  name: '',
  isLoading: false,
  listMode: 'SCROLLVIEW' as 'SCROLLVIEW' | 'FLATLIST' | 'MODAL',
  scroll: false,
  adjustScrollMargin: false,
  index: 1,
  onOpen: () => {},
  onClose: () => {},
}
const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
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
    zIndex,
    isRequired,
    zIndexInverse,
    isLoading,
    name,
    listMode,
    scroll,
    adjustScrollMargin,
    index,
    onOpen,
    onClose,
  } = props
  if (isLoading)
    return <InputEl key={name} label={placeholder ?? ''} error={error} value={'Loading...'} />
  const [open, setOpen] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [val, setVal] = React.useState(value)
  const labelTranslateY = React.useRef(new Animated.Value(0)).current
  const labelTranslateX = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (value !== val) setValue && setValue(val)
  }, [val])
  const onOpenList = () => {
    Animated.timing(labelTranslateY, {
      toValue: -25,
      duration: 100,
      useNativeDriver: true,
    }).start()
    Animated.timing(labelTranslateX, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }).start()
    setIsFocused((prev) => !prev)
    onOpen && onOpen()
  }
  const onCloseList = () => {
    if (isEmpty(value)) {
      Animated.timing(labelTranslateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
      Animated.timing(labelTranslateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
    setIsFocused((prev) => !prev)
    onClose && onClose()
  }
  return (
    <>
      <View
        style={{
          ...styles,
          zIndex: open
            ? ((zIndex ?? 1) * (index ?? 1) ?? 1) * 10000
            : adjustScrollMargin
            ? 100 * (zIndex ?? 1)
            : zIndex,
          marginTop: adjustScrollMargin ? -150 : 6,
          position: 'relative',
        }}
      >
        <Animated.View
          style={{
            ...cssStyles.labelContainer,
            // ...(isFocused ? styles.labelContainerToTop : {}),
            //top: labelTop,
            transform: [
              { translateY: isEmpty(value) ? labelTranslateY : -25 },
              { translateX: isEmpty(value) ? labelTranslateX : 10 },
            ],
          }}
        >
          {/* <Text
          style={[
            cssStyles.labelContainer,
            { color: isFocused ? primaryColor : Boolean(error) ? 'red' : '#171766' },
          ]}
        > */}
          <Text
            style={[
              {
                color: isFocused
                  ? primaryColor
                  : Boolean(error)
                  ? 'red'
                  : isEmpty(value)
                  ? textColor
                  : '#171766',
              },
            ]}
          >
            {placeholder}
          </Text>
          {isRequired && (isFocused || !isEmpty(value)) && (
            <Text style={cssStyles.required}>*</Text>
          )}
          {/* </Text> */}
        </Animated.View>
        <DropDownPicker
          open={open}
          value={value}
          items={items ?? []}
          loading={isLoading}
          setOpen={setOpen}
          setValue={setVal}
          style={{
            borderColor: !isEmpty(error) ? errorColor : isFocused ? primaryColor : textColor,
            borderRadius: 30,
            zIndex: zIndex,
            paddingHorizontal: 20,
            backgroundColor: Boolean(error) && !isFocused ? 'rgba(240, 128, 128,0.2)' : 'white',
          }}
          multiple={mutiple}
          placeholder={''}
          placeholderStyle={{
            color: !isEmpty(error) ? errorColor : 'black',
          }}
          searchable={searchable}
          listMode={listMode}
          onOpen={onOpenList}
          onClose={onCloseList}
          disableBorderRadius={false}
          maxHeight={200}
          mode="BADGE"
          zIndex={zIndex}
          zIndexInverse={zIndexInverse}
          containerStyle={scroll ? { height: 200 } : {}}
        />
      </View>

      <HelperText type="error" visible={Boolean(error)}>
        {error}
      </HelperText>
    </>
  )
}
Dropdown.defaultProps = defaultProps

const cssStyles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    top: 15,
    left: 16,
    zIndex: 100,
    fontSize: 12,
    fontWeight: '400',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  required: {
    color: 'red',
  },
})

export default Dropdown
