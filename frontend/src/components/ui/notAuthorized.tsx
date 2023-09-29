import Link from "next/link";
const NotAuthorized = () => {
  return (
    <main>
      <h1 className="text-5xl text-indigo-700 ">Not Authorized!</h1>
      <Link href={"/login"} className="button">
        Return to Login
      </Link>
    </main>
  );
};

export default NotAuthorized;
