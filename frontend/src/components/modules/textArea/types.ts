export type TTextArea = {
    className: string,
    label: string,
    name: string,
    type: string,
    placeholder: string
    required: boolean,
    value: string,
    onChange?: (e: any) => void
}