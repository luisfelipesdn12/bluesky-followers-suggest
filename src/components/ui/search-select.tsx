import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDrawerOrDialog } from "@/lib/hooks/useOverlayContainer";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { api, getAtpAgent } from "@/lib/utils";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

const SearchSelect: React.FC<{
    value: ProfileView | undefined;
    setValue: (actor: ProfileView) => void;
}> = ({ value, setValue }) => {
    const [search, setSearch] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<ProfileView[]>([]);

    const searchActor = useCallback(async () => {
        if (!search) return;
        await api.get(`/app.bsky.actor.searchActors?q=${encodeURIComponent(search)}`)
            .then(res => setOptions(res.data.actors));
    }, [search]);

    useEffect(() => {
        const id = setTimeout(() => {
            setLoading(true);
            searchActor().finally(() => setLoading(false));
        }, 500);
        return () => clearTimeout(id);
    }, [search, searchActor]);

    const {
        Drawer,
        DrawerContent,
        DrawerDescription,
        DrawerHeader,
        DrawerTitle,
        DrawerTrigger,
        DrawerClose,
        DrawerFooter
    } = useDrawerOrDialog();

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <div onClick={() => setOpen(true)}>
                <DrawerTrigger asChild>
                    {value ? (
                        <div
                            className={"relative flex w-full cursor-default select-none items-center rounded-sm py-2 px-4 text-sm gap-4 outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-left border"}
                        >
                            <Avatar>
                                <AvatarImage src={value.avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-lg font-medium">
                                    {value.displayName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    @{value.handle}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Select>
                            <SelectTrigger className="pointer-events-none">
                                <SelectValue placeholder="Select a profile..." />
                            </SelectTrigger>
                        </Select>
                    )}
                </DrawerTrigger>
            </div>
            <DrawerContent className="min-h-[60vh] flex flex-col gap-4 px-5">
                <Input
                    value={search} onChange={e => setSearch(e.target.value)}
                    className="mt-4" type="text" placeholder="Search a handle here..." />
                <ScrollArea className="p-0 pr-4 pt-0 flex flex-col pb-0 max-h-[60vh] overflow-hidden">
                    {loading ? (
                        <div className="w-full h-full flex justify-center">
                            <LoaderCircleIcon size={"2.5rem"} className="animate-spin text-muted-foreground" />
                        </div>
                    )
                        : options.map((actor, key) => (
                            <div
                                key={key}
                                onClick={() => {
                                    setValue(actor);
                                    setOpen(false);
                                }}
                                className={"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm gap-4 outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"}
                            >
                                <Avatar>
                                    <AvatarImage src={actor.avatar} />
                                    <AvatarFallback>{actor.displayName}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-lg font-medium">
                                        {actor.displayName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        @{actor.handle}
                                    </p>
                                </div>
                            </div>
                        ))}
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
};

export default SearchSelect;
