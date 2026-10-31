import { CommandBox } from "@/components/command-box";
import { HomeCtas } from "@/components/home-ctas";
import { HomeDemoStage } from "@/components/home-demo-stage";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

export default function IndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
      <PageTransition>
        <section className="container-wrapper relative">
          <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
            <h1 className="max-w-7xl bg-linear-to-b from-foreground via-foreground to-foreground/65 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Frakment
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A monochrome component registry. Neutral by nature, precise by
              design.
            </p>

            <CommandBox className="mt-4 w-full max-w-xl" />

            <HomeCtas className="mt-4" />
          </div>
        </section>

        <section className="w-full pb-16 lg:pb-20">
          <HomeDemoStage className="px-4 md:px-8" />
        </section>
      </PageTransition>
    </>
  );
}
