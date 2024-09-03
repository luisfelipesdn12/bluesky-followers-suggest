"use client";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import Pilot from "@/icons/Pilot";
import Image from "next/image";

import { AtpAgent } from "@atproto/api";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getAtpAgent } from "@/lib/utils";
import SearchSelect from "@/components/ui/search-select";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Button } from "@/components/ui/button";

/**
 * The home page of the app.
 */
export default function Home() {
    const [actor, setActor] = useState<ProfileView>();

    return (
        <>
            <Navbar />
            <main className="flex flex-col py-20 items-center justify-center gap-4 text-center">
                <Image src="/icon.png" width={175} height={175} alt="Bluesky Logo" style={{ borderRadius: "2.5rem" }} />
                <h1 className="text-5xl font-bold">
                    Bluesky Follow Suggestion
                </h1>
                <p className="text-muted-foreground">
                    Score-based followser suggestion for bluesky!
                </p>

                <SearchSelect value={actor} setValue={setActor} />

                <Button disabled={!actor}>
                    Search suggestions
                </Button>
            </main>
        </>
    );
}
