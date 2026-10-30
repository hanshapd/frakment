import { ComponentPreviewTabs } from "@/components/component-preview-tabs";
import { ComponentSource } from "@/components/component-source";
import { getRegistryComponent } from "@/lib/registry";

interface ComponentPreviewProps {
  /** Nama komponen di registry — dipakai untuk mencari source code */
  name: string;
  /** Opsional: judul file yang tampil di atas blok kode */
  title?: string;
  /** Opsional: path file sumber jika berbeda dari default registry */
  src?: string;
  className?: string;
  previewClassName?: string;
  /** Sembunyikan tab Code — hanya tampilkan preview */
  hideCode?: boolean;
  /** Alignment konten preview */
  align?: "center" | "start" | "end";
  /** Backward compat: children dirender langsung sebagai preview */
  children?: React.ReactNode;
}

export async function ComponentPreview({
  name,
  title,
  src,
  className,
  previewClassName,
  hideCode = false,
  align = "center",
  children,
}: ComponentPreviewProps) {
  const Component = getRegistryComponent(name, "default");
  const previewNode = children ?? (Component ? <Component /> : null);

  if (!previewNode) {
    return (
      <div className="my-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        Component <code className="font-mono text-xs">{name}</code> tidak
        ditemukan di registry.
      </div>
    );
  }

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      hideCode={hideCode}
      align={align}
      component={previewNode}
      source={<ComponentSource name={name} src={src} title={title} />}
    />
  );
}
