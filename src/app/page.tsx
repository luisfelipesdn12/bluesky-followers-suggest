"use client";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import Pilot from "@/icons/Pilot";
import Image from "next/image";

import { AppBskyGraphGetFollowers, AtpAgent } from "@atproto/api";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { api, getAtpAgent } from "@/lib/utils";
import SearchSelect from "@/components/ui/search-select";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * The home page of the app.
 */
export default function Home() {
    const [actor, setActor] = useState<ProfileView>();
    const [suggestions, setSuggestions] = useState<Record<string, {
        data: ProfileView;
        count: number;
    }>>({});

    const searchSuggestions = useCallback(async () => {
        if (!actor) return;

        const follows: ProfileView[] = await api
            .get(`/app.bsky.graph.getFollows?actor=${actor.handle}`)
            .then(res => (res.data?.follows as ProfileView[]));

        const suggestions: Record<string, {
            data: ProfileView;
            count: number;
        }> = {};

        for (const follow of follows) {
            console.log({ follow });
            const subFollows: ProfileView[] = await api
                .get(`/app.bsky.graph.getFollows?actor=${follow.handle}`)
                .then(res => (res.data?.follows as ProfileView[]));

            for (const subFollow of subFollows) {
                console.log({ subFollow });
                if (follows.some(f => f.handle === subFollow.handle)) continue;
                if (subFollow.handle === actor.handle) continue;

                if (!!suggestions[subFollow.handle]) {
                    suggestions[subFollow.handle].count++;
                } else {
                    suggestions[subFollow.handle] = {
                        data: subFollow,
                        count: 1,
                    };
                }

                console.log({ suggestions });
            }
        }

        console.log(suggestions);

        const sortedSuggestions: Record<string, {
            data: ProfileView;
            count: number;
        }> = {};

        Object.keys(suggestions).sort((a, b) => suggestions[a].count > suggestions[b].count ? -1 : 1)
            .forEach(handle => sortedSuggestions[handle] = suggestions[handle]);

        console.log(sortedSuggestions);
        setSuggestions(sortedSuggestions);
    }, [actor]);

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

                <Button disabled={!actor} onClick={searchSuggestions}>
                    Search suggestions
                </Button>

                <div className="w-full p-4 flex flex-col gap-4">
                    {Object.keys(suggestions)?.map((handle, key) => (
                        <div
                            key={key}
                            className={"relative flex w-full cursor-default select-none items-center rounded-sm py-2 px-4 text-sm gap-4 outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-left border"}
                        >
                            <div className="flex w-full cursor-default select-none items-center rounded-sm py-2 px-4 text-sm gap-4">
                                <Avatar>
                                    <AvatarImage src={suggestions[handle].data.avatar} />
                                    <AvatarFallback>{suggestions[handle].data.displayName}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-lg font-medium">
                                        {suggestions[handle].data.displayName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        @{suggestions[handle].data.handle}
                                    </p>
                                </div>
                            </div>
                            <p className="text-md text-muted-foreground min-w-fit">
                                Score: {suggestions[handle].count}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
