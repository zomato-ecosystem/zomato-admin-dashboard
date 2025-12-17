"use client"

import * as React from "react"
import { Search, Plus, FileText, Edit2, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const articles = [
    { id: 1, title: "How to process a partial refund", category: "refunds", views: 1250, updated: "2 days ago" },
    { id: 2, title: "Handling aggressive customers", category: "policy", views: 3400, updated: "1 week ago" },
    { id: 3, title: "Verifying FSSAI documents", category: "onboarding", views: 890, updated: "3 days ago" },
    { id: 4, title: "Escalation paths for Food Poisoning", category: "emergency", views: 560, updated: "1 month ago" },
]

export function KnowledgeBase() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search knowledge base..." className="pl-8" />
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Article
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <Card key={article.id} className="group hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-base line-clamp-1" title={article.title}>{article.title}</CardTitle>
                                    <CardDescription>
                                        <Badge variant="secondary" className="text-xs font-normal">{article.category}</Badge>
                                    </CardDescription>
                                </div>
                                <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center"><Eye className="h-3 w-3 mr-1" /> {article.views} views</span>
                                <span>Updated {article.updated}</span>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3 w-3" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
