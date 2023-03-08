export const getFileSize = (fileSize: number): string => {
    if (fileSize > 1000) {
      return Math.floor(fileSize / 1000) + " MB";
    } else {
      return Math.floor(fileSize) + " KB";
    }
}