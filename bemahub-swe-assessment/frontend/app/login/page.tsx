import { LoginForm } from "@/components/auth/loginform";


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full">
          {/* <p className="mb-8 text-sm font-semibold text-text-primary">
            Bema Learn
          </p> */}

          <LoginForm />
        </div>
      </div>
    </main>
  );
}