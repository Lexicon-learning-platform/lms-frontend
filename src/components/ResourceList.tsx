import { useState } from "react";
import type { Resource } from "../models/resource";
import DialogBase from "./DialogBase";
import ResourceDetail from "./Resource";

interface Props {
    resources: Resource[];
}

export default function ResourceList({ resources }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [clickedResource, setClickedResource] = useState<string>("");

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
                <h3 className="text-xl font-semibold mb-4">Resurser</h3>
                <div>{/* insert pagination component */}</div>
            </div>
            <div>
                {resources.length > 0 ? (
                    resources.map((r) => (
                        <div
                            key={r.id}
                            className="border border-black rounded-lg p-1.5 mb-3"
                            onClick={() => {
                                setClickedResource(r.id);
                                setIsOpen(!isOpen);
                            }}
                        >
                            <h4 className="font-semibold">{r.name}</h4>
                            <p>{r.description}</p>
                            <p>Typ: {r.type}</p>
                        </div>
                    ))
                ) : (
                    <span>Inga resurser registrerade</span>
                )}
            </div>
            {isOpen && (
                <DialogBase
                    onClose={() => {
                        setClickedResource("");
                        setIsOpen(false);
                    }}
                >
                    <h3
                        id="dialog-title"
                        className="w-full text-center text-2xl mb-4"
                    >
                        Resursdetaljer
                    </h3>
                    <ResourceDetail resourceId={clickedResource} />
                </DialogBase>
            )}
        </div>
    );
}
