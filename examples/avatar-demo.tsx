import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage
          src="/avatars/female-l-1.avif"
          alt="@me"
          className="grayscale"
        />
        <AvatarFallback>{"ME"}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/avatars/male-l.avif" alt="@rabbit" />
        <AvatarFallback>{"R"}</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <AvatarGroup className="grayscale">
        <Avatar>
          <AvatarImage src="/avatars/female-l-1.avif" alt="@anna" />
          <AvatarFallback>{"AN"}</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avatars/female-l-2.avif" alt="@sara" />
          <AvatarFallback>{"SA"}</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avatars/female-l-3.avif" alt="@liv" />
          <AvatarFallback>{"LV"}</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>{"+3"}</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
