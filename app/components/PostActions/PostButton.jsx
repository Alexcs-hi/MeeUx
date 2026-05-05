import ToolTip from '../ToolTip';

export default function PostButton({ name, onClick, src , className }) {
    return (
      <ToolTip label={name}>
        <button onClick={onClick} className={`cursor-pointer p-2 rounded-xl hover:bg-gray-200/20 transition`}>
          <img className={` ${className} w-4 md:w-5 lg:w-6    grayscale invert-75`} src={src} alt={name} />
        </button>
      </ToolTip>
    );
  }
