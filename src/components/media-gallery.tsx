import Image from "next/image";
import type { MediaItem } from "@/lib/media";

// Mosaico de fotos: la primera imagen ocupa 2x2, el resto 1x1.
export function MediaGallery({ items }: { items: MediaItem[] }) {
  return (
    <div className="grid auto-rows-[14rem] grid-cols-2 gap-4 sm:auto-rows-[18rem] sm:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.alt}
          className={`group relative overflow-hidden rounded-2xl ${
            index === 0 ? "col-span-2 row-span-2" : "col-span-1"
          }`}
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            placeholder="blur"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 640px) 25vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}
