import Link from "next/link";

export function AuthFooterLink({
  question,
  linkLabel,
  href,
}: {
  question: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <p className="mt-8 text-center text-sm text-muted-foreground">
      {question}{" "}
      <Link href={href} className="font-medium text-primary hover:underline">
        {linkLabel}
      </Link>
    </p>
  );
}
