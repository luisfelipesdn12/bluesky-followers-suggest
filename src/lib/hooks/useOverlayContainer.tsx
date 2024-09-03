
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";

export function useDrawerOrDialog() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const HideContainer: React.FC = () => null;

    return isDesktop ? {
        Drawer: Dialog,
        DrawerContent: DialogContent,
        DrawerDescription: DialogDescription,
        DrawerHeader: DialogHeader,
        DrawerTitle: DialogTitle,
        DrawerTrigger: DialogTrigger,
        DrawerClose: HideContainer,
        DrawerFooter: DrawerFooter,
    } : {
        Drawer: Drawer,
        DrawerContent: DrawerContent,
        DrawerDescription: DrawerDescription,
        DrawerHeader: DrawerHeader,
        DrawerTitle: DrawerTitle,
        DrawerTrigger: DrawerTrigger,
        DrawerClose: DrawerClose,
        DrawerFooter: DrawerFooter,
    };
}
