"use client"

import { MarketingCampaignForm } from "@/components/forms/MarketingCampaignForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateCampaignPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/marketing">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
                    <p className="text-muted-foreground">Design a new marketing campaign to engage users.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <MarketingCampaignForm />
            </div>
        </div>
    )
}
