import { SessionProviderPageProps } from "@/components/RestrictedPage";
import Navbar from "@/components/navbar";
import Pilot from "@/icons/Pilot";

export default function Home({ session }: SessionProviderPageProps) {
  return (
    <>
      <Navbar session={session} />
      <main className="flex flex-col py-20 items-center justify-center gap-4 text-center">
        <Pilot className="max-w-full" />
        <h1 className="text-5xl font-bold">
          Vacation Planner
        </h1>
        <p className="text-muted-foreground">
          The perfect planner for your deserved vacation. Set trips, manage dates and more!
        </p>
      </main>
    </>
  );
}
