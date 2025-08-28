const APP_NAME = "Blog App";
export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = reject;
  });
};

export function GetId(): string {
  return (Math.random() * Date.now()).toFixed(5);
}

export function setSiteTitle(title: string): void {
  document.title = APP_NAME + " - " + title;
}
