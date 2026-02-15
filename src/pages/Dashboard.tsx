import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Dashboard() {
    return <>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Card className="w-full mt-4">
            <CardHeader>
                <CardTitle>Selamat Datang di RuangBooking</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Tempat untuk mengelola dan memesan ruang meeting.</p>
            </CardContent>
        </Card>
    </>;
}

export default Dashboard;