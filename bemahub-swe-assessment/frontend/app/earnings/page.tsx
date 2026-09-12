import { EarningsCard } from "@/components/earningscard";


export default function EarningsPage() {
    return (
        <main className="min-h-screen bg-bg px-6 py-12">
            <div className="mx-auto max-w-5xl">
                <div>
                    <p className="text-sm font-semibold text-accent">Instructor</p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
                        Earnings
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary">
                        View your available balance and payout information.
                    </p>
                </div>

                <div className="mt-8">
                    <EarningsCard />
                </div>
            </div>
        </main>
    );
}