import React from 'react';

interface CustomProps {
    title: string;
    artist: string;
    link: string;
}

interface ListProps {
    musics: CustomProps[];
    onDelete: (index: number) => void;
    onEdit: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void;}

const List: React.FC<ListProps> = ({ musics, onDelete, onEdit }) => {
    return (
        <div>
            {musics.map((music, index) => (
                <div key={index} className="flex justify-between w-full hover:bg-slate-100 duration-100 p-4 cursor-pointer">
                    <div className="flex flex-row gap-5">
                        <h1>{music.title}</h1>
                        <p>{music.artist}</p>
                        <p>{music.link}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="bg-gray-700 text-white p-2 font-medium"
                            onClick={(event) => onEdit(index, event)}
                        >Testar</button>
                        <button
                            className="bg-red-500 text-white p-2 font-medium"
                            onClick={() => onDelete(index)}
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;
