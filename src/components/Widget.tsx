interface CustomProps {
    title: string,
    text: string,
    navigate: string,
    onclick: () => void,
}

export default function Widget({ title, text, navigate, onclick }: CustomProps) {
    return (
        <div className="w-1/2 h-[300px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
                <h1 className="font-bold text-xl text-[#67748E]">{title}</h1>
                <p className="text-xl text-[#344767]">{text}</p>
            </div>
            <button onClick={onclick} className="bg-gray-900 text-white w-full p-4 rounded-md">{navigate}</button>
        </div>
    )
}
