import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Input } from "./ui/input";

const SearchField = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="q" placeholder="Search..." className="pe-10" />
        <SearchIcon className="text-muted-foreground absolute top-1/2 right-3 size-5 -translate-y-1/2 transform" />
      </div>
    </form>
  );
};

export default SearchField;
