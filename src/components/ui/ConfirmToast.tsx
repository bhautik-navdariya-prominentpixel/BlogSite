import type { MouseEvent } from "react";
import { toast } from "react-toastify";
import { globalTostTheme } from "../../utils/tost-theme-util";

const ConfirmToast = (props: { onConfirm: (e: MouseEvent) => void; onCancel: (e: MouseEvent) => void; text: string }) => (
  <div>
    <p>{props.text}</p>
    <button onClick={props.onConfirm} className="bg-red-900 me-2 rounded px-2 py-1 text-white hover:bg-red-800 cursor-pointer">Yes</button>
    <button onClick={props.onCancel} className="bg-blue-900 rounded px-2 py-1 text-white hover:bg-blue-800 cursor-pointer">No</button>
  </div>
);

export function showConfirmToast({ onConfirm, text }: { onConfirm: () => void; text: string }) {
  const id = toast.info(
    <ConfirmToast
      text={text}
      onConfirm={() => {
        onConfirm();
        toast.dismiss(id);
      }}
      onCancel={() => toast.dismiss(id)}
    />,
    { closeOnClick: false, ...globalTostTheme, autoClose: false }
  );
}
