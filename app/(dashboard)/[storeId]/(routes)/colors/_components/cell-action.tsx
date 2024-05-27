"use client";
import axios from "axios";
import { ColorColumn } from "./columns";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/ui/modals/alert-modal";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

interface CellActionProps {
    data: ColorColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const router = useRouter();
    const { storeId } = useParams();

    // onCopy function for copying Billboard id
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Color Id copied to clip board");
    }

    const onDelete = async (id: string) => {
        setLoading(true);
        // send a delete request to delete billboard
        try {
            await axios.delete(`/api/${storeId}/colors/${id}`);
            toast.success("Color Deleted successfully.");
            router.refresh();

        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
        <AlertModal
            item="Color"
            loading={loading}
            isOpen={open}
            onClose={ () => setOpen(false)}
            onConfirm={() => onDelete(data.id)}
        />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${storeId}/colors/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default CellAction;