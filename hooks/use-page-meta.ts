import { useEffect } from "react";

export function usePageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (tag) tag.content = description;
    }
  }, [title, description]);
}
