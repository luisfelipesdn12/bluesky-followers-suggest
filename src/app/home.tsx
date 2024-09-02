
import Navbar from "@/components/navbar";
import Pilot from "@/icons/Pilot";
import Image from "next/image";

/**
 * The home page of the app.
 */
export default function Home() {
    return (
        <>
            <Navbar />
            <main className="flex flex-col py-20 items-center justify-center gap-4 text-center">
                <Image src="/icon.png" width={200} height={200} alt="Bluesky Logo" style={{ borderRadius: "2.5rem" }} />
                <h1 className="text-5xl font-bold">
                    Bluesky Follow Suggestion
                </h1>
                <p className="text-muted-foreground">
                    Score-based followser suggestion for bluesky!
                </p>
            </main>
        </>
    );
}
