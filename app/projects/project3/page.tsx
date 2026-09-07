import Link from "next/link";

export default function Project3() {
  return (
    <div>
      <div>
        <h1>Project3</h1>
        <p>Still in development :(</p>
        {/* back to home */}
        <Link href="/" className="text-blue-500">
          Back to home
        </Link>
      </div>
    </div>
  );
}
