
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    Input,
    Picker,
} from 'antd-mobile';

const PickerPopup = forwardRef((props: any, ref) => {
    const [popupVisible, setPopupVisible] = useState(false)
   
    const [columns, setColumns] = useState(props.columns)
    const [value, setValue] = useState<(string | null)[]>([''])

    useEffect(() => {
        setColumns(props.columns)
    }, [props.columns])

    useImperativeHandle(ref, () => ({
        openModal: (openModal: boolean) => setPopupVisible(openModal),
    }));

    return <Picker
        title={
            <Input
                placeholder='请输入关键字'
                onBlur={(target) => {
                    // console.log(target.)
                }}
            />
        }
        columns={columns}
        visible={popupVisible}
        onClose={() => {
            setPopupVisible(false)
        }}
        onConfirm={v => {
            setValue(v)
            setPopupVisible(false)
        }}
    />
}
)

export default PickerPopup