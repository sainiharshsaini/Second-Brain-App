interface InputProps {
    placeholder: string;
    reference?: any;
}

const Input = ({ placeholder, reference }: InputProps) => {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" ></input>
    </div>
}

export default Input