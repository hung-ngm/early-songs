export type TPreview = {
    className: string,
    onClose: () => void,
    songName: string,
    mintPrice: string,
    thumbnailUrl: string,
    songSize: number | undefined
}